import { StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
import { Chat } from '~/models/chat.model'
import { IMessage, Message } from '~/models/message.model'
import { createMessageValidation } from '~/validations/message.validation'

const createMessageService = async (data: IMessage, userId: string) => {
  const { error } = await createMessageValidation(data)
  if (error) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, error.message)
  }
  const chatInMessage = await Chat.findOne({
    _id: data.chat_id,
    members: userId
  })
  if (!chatInMessage) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Chat not found or you are not a member of this chat')
  }
  const newMessage = await Message.create({ ...data, sender_id: userId })
  chatInMessage.last_message = newMessage.content
  chatInMessage.last_message_at = new Date()
  chatInMessage.last_message_by = userId
  await chatInMessage.save()
  return newMessage
}

export { createMessageService }
