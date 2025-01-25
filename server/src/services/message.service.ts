import { StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
import { Chat } from '~/models/chat.model'
import { IMessage, Message } from '~/models/message.model'
import { ReadStatus } from '~/models/readStatus.model'
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
  // save read status for sender
  await ReadStatus.create({
    chat_id: data.chat_id,
    user_id: userId,
    last_message_id: newMessage._id
  })
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
// change status of message from sent to read
const changeStatusMessageService = async (userId: string, message_id: string, chat_id: string) => {
  const chat = await Chat.findById(chat_id)
  if (chat?.members.indexOf(userId) === -1) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Chat not found or you are not a member of this chat')
  }
  const message = await Message.findOne({
    _id: message_id,
    chat_id: chat_id,
    sender_id: { $ne: userId }
  })
  if (!message) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Message not found or you are not the receiver of this message')
  }
  const checkReadStatusIsExist = await ReadStatus.findOne({
    chat_id: chat_id,
    user_id: userId,
    last_message_id: message_id
  })
  if (checkReadStatusIsExist) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Message status of this user already changed')
  }
  const readStatus = await ReadStatus.create({
    chat_id: message.chat_id,
    user_id: userId,
    last_message_id: message_id
  })
  return { message, readStatus }
}
export { createMessageService, GetMessagesByChatService, changeStatusMessageService }
