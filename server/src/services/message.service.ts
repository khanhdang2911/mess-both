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

const GetMessagesByChatService = async (userId: string, chat_id: string) => {
  const chat = await Chat.findOne({
    _id: chat_id,
    members: userId
  })
  if (!chat) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Chat not found or you are not a member of this chat')
  }
  const messages = await Message.aggregate([
    {
      $match: {
        chat_id: chat_id
      }
    },
    {
      $lookup: {
        from: 'users',
        let: { sender_id: { $toObjectId: '$sender_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$sender_id']
              }
            }
          }
        ],
        as: 'sender'
      }
    },
    {
      $unwind: '$sender'
    },
    {
      $project: {
        _id: 1,
        chat_id: 1,
        sender_id: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        'sender._id': 1,
        'sender.firstname': 1,
        'sender.lastname': 1,
        'sender.avatar': 1
      }
    }
  ])
  return messages
}
export { createMessageService, GetMessagesByChatService }
