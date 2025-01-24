import { Server, Socket } from 'socket.io'
import { rooms } from '.'
import { notificationMessageService } from '~/services/notification.service'

const socketChat = (io: Server, socket: Socket) => {
  socket.on('join-room', ({ chatId, userId }) => {
    socket.join(chatId)
    if (!rooms.has(chatId)) {
      rooms.set(chatId, new Set())
    }
    rooms.get(chatId)?.add(userId)
  })
  socket.on('send-message', async (message) => {
    io.to(message.chat_id).emit('receive-message', message)
    await notificationMessageService(message.chat_id, message.sender_id, io)
  })
  socket.on('leave-room', ({ chatId, userId }) => {
    rooms.get(chatId)?.delete(userId)
    if (rooms.get(chatId)?.size === 0) {
      rooms.delete(chatId)
    }
    socket.leave(chatId)
  })
}
export default socketChat
