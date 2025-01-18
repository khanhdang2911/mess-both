import { StatusCodes } from 'http-status-codes'
import { CHAT_TYPES } from '~/constants/chat.constant'
import ErrorResponse from '~/core/error.response'
import { Chat, IChat } from '~/models/chat.model'
import { User } from '~/models/user.model'
import { createChatValidation } from '~/validations/chat.validation'

const createChatService = async (data: IChat) => {
  const { error } = await createChatValidation(data)
  if (error) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, error.message)
  }
  const checkMembersIsChatCreated = await Chat.findOne({
    members: {
      $all: data.members
    }
  })
  if (checkMembersIsChatCreated) {
    return null
  }
  const newChat = await Chat.create(data)
  return newChat
}

const getChatsByUserService = async (userId: string) => {
  const chats = await Chat.find({
    members: userId
  })
  const chatListResponse: IChat[] = await Promise.all(
    chats.map(async (chat) => {
      if (!chat.chat_name) {
        if (chat.chat_type === CHAT_TYPES.GROUP) {
          const chatMembers = await User.find({
            _id: {
              $in: chat.members
            }
          })
          chat.chat_name = chatMembers.map((member) => member.firstname).join(', ')
        } else {
          const chatMembers = await User.find({
            _id: {
              $in: chat.members.filter((member) => member !== userId)
            }
          })
          chat.chat_name = chatMembers[0].firstname + ' ' + chatMembers[0].lastname
        }
      }
      return chat
    })
  )

  return chatListResponse
}
export { createChatService, getChatsByUserService }
