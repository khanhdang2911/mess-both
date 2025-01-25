import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { CHAT_TYPES } from '~/constants/chat.constant'
import ErrorResponse from '~/core/error.response'
import { Chat, IChat } from '~/models/chat.model'
import { ReadStatus } from '~/models/readStatus.model'
import { User } from '~/models/user.model'
import { createChatValidation } from '~/validations/chat.validation'
const getChatNameAndChatAvatar = async (chat: IChat, userId: string) => {
  let chatName = ''
  let chatAvatar = ''
  if (chat.chat_type === CHAT_TYPES.GROUP) {
    const chatMembers = await User.find({
      _id: {
        $in: chat.members
      }
    })
    chatName = chat.chat_name || chatMembers.map((member) => member.firstname).join(', ')
    chatAvatar =
      chat.chat_avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-8KCTnNpTQXlTfDb7z2Ka8hJfREAb2fqww&s'
  } else {
    const ortherMemberId = chat.members.find((member) => member !== userId)
    const ortherMember = await User.findById(ortherMemberId)
    if (!ortherMember) {
      throw new ErrorResponse(StatusCodes.NOT_FOUND, 'User not found in chat')
    }
    chatName = ortherMember.firstname + ' ' + ortherMember.lastname
    chatAvatar = ortherMember.avatar
  }
  return { chatName, chatAvatar }
}
const createChatService = async (data: IChat, userId: string) => {
  const { error } = await createChatValidation(data)
  if (error) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, error.message)
  }
  if (!data.members.includes(userId)) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'You must be a member of the chat')
  }

  const checkMembersIsChatCreated = await Chat.findOne({
    members: {
      $all: data.members
    }
  })
  if (checkMembersIsChatCreated) {
    throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Chat already exists or you can not create chat with yourself')
  }
  const chat = await Chat.create(data)
  const { chatName, chatAvatar } = await getChatNameAndChatAvatar(chat, userId)
  chat.chat_name = chat.chat_name || chatName
  chat.chat_avatar = chat.chat_avatar || chatAvatar
  return await chat.save()
}

const getChatsByUserService = async (userId: string) => {
  const chats = await Chat.aggregate([
    {
      $match: {
        members: userId
      }
    },
    {
      $lookup: {
        from: 'messages',
        let: { last_message_id: { $toObjectId: '$last_message_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$last_message_id']
              }
            }
          }
        ],
        as: 'last_message_info'
      }
    },
    {
      $unwind: {
        path: '$last_message_info',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
  const chatListResponse: IChat[] = await Promise.all(
    chats.map(async (chat) => {
      const { chatName, chatAvatar } = await getChatNameAndChatAvatar(chat, userId)
      chat.chat_name = chatName
      chat.chat_avatar = chatAvatar
      const checkLastMessageIsRead = await ReadStatus.findOne({
        chat_id: chat._id.toString(),
        user_id: userId,
        last_message_id: chat.last_message_id
      })
      chat.last_message_is_read = !!checkLastMessageIsRead
      return chat
    })
  )

  return chatListResponse
}

const getChatByIdService = async (chatId: string, userId: string) => {
  const chat = await Chat.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(chatId)
      }
    },
    {
      $lookup: {
        from: 'messages',
        let: { last_message_id: { $toObjectId: '$last_message_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$last_message_id']
              }
            }
          }
        ],
        as: 'last_message_info'
      }
    },
    {
      $unwind: {
        path: '$last_message_info',
        preserveNullAndEmptyArrays: true
      }
    }
  ])
  const chatInfo = chat[0]
  if (!chatInfo) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Chat not found')
  }
  if (!chatInfo.members.includes(userId)) {
    throw new ErrorResponse(StatusCodes.FORBIDDEN, 'You are not a member of this chat')
  }
  const { chatName, chatAvatar } = await getChatNameAndChatAvatar(chatInfo, userId)
  chatInfo.chat_name = chatName
  chatInfo.chat_avatar = chatAvatar
  const checkLastMessageIsRead = await ReadStatus.findOne({
    chat_id: chatInfo._id.toString(),
    user_id: userId,
    last_message_id: chatInfo.last_message_id
  })
  chatInfo.last_message_is_read = !!checkLastMessageIsRead
  return chatInfo
}

export { createChatService, getChatsByUserService, getChatByIdService }
