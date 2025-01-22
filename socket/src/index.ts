import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createServer } from 'http'
const httpServer = createServer()

dotenv.config()
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FE_URL
  }
})
const usersOnline = new Map<string, string>()
const rooms = new Map<string, Set<string>>()
io.on('connection', (socket) => {
  socket.on('add-user-online', (userId) => {
    const checkIsUserOnline = usersOnline.has(userId)
    if (!checkIsUserOnline) {
      usersOnline.set(userId, socket.id)
    }
    io.emit(
      'users-online',
      Array.from(usersOnline.entries(), (user) => {
        return {
          userId: user[0],
          socketId: user[1]
        }
      })
    )
  })

  //Chat area
  socket.on('join-room', ({ chatId, userId }) => {
    socket.join(chatId)
    if (!rooms.has(chatId)) {
      rooms.set(chatId, new Set())
    }
    rooms.get(chatId)?.add(userId)
  })
  socket.on('send-message', (message) => {
    io.to(message.chat_id).emit('receive-message', message)
  })
  socket.on('leave-room', ({ chatId, userId }) => {
    rooms.get(chatId)?.delete(userId)
    if (rooms.get(chatId)?.size === 0) {
      rooms.delete(chatId)
    }
    socket.leave(chatId)
  })

  //disconnect
  socket.on('disconnect', () => {
    for (const [userId, socketId] of usersOnline.entries()) {
      if (socketId === socket.id) {
        usersOnline.delete(userId)
      }
    }
    io.emit(
      'users-online',
      Array.from(usersOnline.entries(), (user) => {
        return {
          userId: user[0],
          socketId: user[1]
        }
      })
    )
  })
})

httpServer.listen(process.env.SOCKET_PORT, () => {
  console.log('Server is running on port ' + process.env.SOCKET_PORT)
})
