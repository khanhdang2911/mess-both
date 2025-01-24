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
  chatInMessage.last_message_id = newMessage._id.toString()
  await chatInMessage.save()
  const fullInfoMessage = await Message.aggregate([
    {
      $match: {
        _id: newMessage._id
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
        status: 1,
        type: 1,
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
  return fullInfoMessage[0]
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
        status: 1,
        type: 1,
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

const changeStatusMessageService = async (userId: string, message_id: string, status: string) => {
  const message = await Message.findOne({
    _id: message_id
  })
  if (!message) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Message not found or you are not the sender of this message')
  }
  message.status = status
  return await message.save()
}
export { createMessageService, GetMessagesByChatService, changeStatusMessageService }
