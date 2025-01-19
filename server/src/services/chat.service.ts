import { StatusCodes } from 'http-status-codes'
import { CHAT_TYPES } from '~/constants/chat.constant'
import ErrorResponse from '~/core/error.response'
import { Chat, IChat } from '~/models/chat.model'
import { User } from '~/models/user.model'
import { createChatValidation } from '~/validations/chat.validation'

const createChatService = async (data: IChat, userId: string) => {
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
  const chat = await Chat.create(data)
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
  if (!chat.chat_avatar) {
    if (chat.chat_type === CHAT_TYPES.GROUP) {
      chat.chat_avatar = 'https://flowbite.com/docs/images/people/50/guy-6.jpg'
    } else {
      const chatMembers = await User.find({
        _id: {
          $in: chat.members.filter((member) => member !== userId)
        }
      })
      chat.chat_avatar = chatMembers[0].avatar
    }
  }
  return await chat.save()
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
      if (!chat.chat_avatar) {
        if (chat.chat_type === CHAT_TYPES.GROUP) {
          chat.chat_avatar = 'https://flowbite.com/docs/images/people/50/guy-6.jpg'
        } else {
          const chatMembers = await User.find({
            _id: {
              $in: chat.members.filter((member) => member !== userId)
            }
          })
          chat.chat_avatar = chatMembers[0].avatar
        }
      }

      return chat
    })
  )

  return chatListResponse
}

const getChatByIdService = async (chatId: string, userId: string) => {
  const chat = await Chat.findById(chatId)
  if (!chat) {
    throw new ErrorResponse(StatusCodes.NOT_FOUND, 'Chat not found')
  }
  const chatResponse = { ...chat.toObject() }
  if (!chatResponse.chat_name) {
    if (chatResponse.chat_type === CHAT_TYPES.GROUP) {
      const chatMembers = await User.find({
        _id: {
          $in: chatResponse.members
        }
      })
      chatResponse.chat_name = chatMembers.map((member) => member.firstname).join(', ')
    } else {
      const chatMembers = await User.find({
        _id: {
          $in: chatResponse.members.filter((member) => member !== userId)
        }
      })
      chatResponse.chat_name = chatMembers[0].firstname + ' ' + chatMembers[0].lastname
    }
  }
  if (!chatResponse.chat_avatar) {
    if (chatResponse.chat_type === CHAT_TYPES.GROUP) {
      chatResponse.chat_avatar =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx-8KCTnNpTQXlTfDb7z2Ka8hJfREAb2fqww&s'
    } else {
      const chatMembers = await User.find({
        _id: {
          $in: chatResponse.members.filter((member) => member !== userId)
        }
      })
      chatResponse.chat_avatar = chatMembers[0].avatar
    }
  }
  return chatResponse
}
export { createChatService, getChatsByUserService, getChatByIdService }
