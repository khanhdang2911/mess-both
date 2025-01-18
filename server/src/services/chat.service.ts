import { StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
import { Chat, IChat } from '~/models/chat.model'
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
  return chats
}
export { createChatService, getChatsByUserService }
