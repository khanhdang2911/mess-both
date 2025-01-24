import { Server } from 'socket.io'
import socketUser from './user'
import socketChat from './chat.'

export const rooms = new Map<string, Set<string>>()
export const usersOnline = new Map<string, string>()

const socketHandlers = (io: Server) => {
  io.on('connection', (socket) => {
    socketUser(io, socket)
    socketChat(io, socket)
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
}

export default socketHandlers
