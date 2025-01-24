import { Server } from 'socket.io'
import { getChatByIdService } from './chat.service'
import { usersOnline } from '~/socket'

const notificationMessageService = async (chat_id: string, sender_id: string, io: Server) => {
  try {
    const chatInfo = await getChatByIdService(chat_id, sender_id)
    const chatMembers = new Set(chatInfo.members)
    const usersOnlineInChat: { userId: string; socketId: string }[] = []
    for (const [userId, socketId] of usersOnline.entries()) {
      if (chatMembers.has(userId)) {
        usersOnlineInChat.push({ userId, socketId })
      }
    }
    await Promise.all(
      usersOnlineInChat.map(async ({ userId, socketId }) => {
        if (socketId) {
          const chatInfoForIndividual = await getChatByIdService(chat_id, userId)
          return io.to(socketId).emit('receive-notification', chatInfoForIndividual)
        }
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export { notificationMessageService }
