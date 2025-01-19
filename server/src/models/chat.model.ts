import mongoose, { Schema } from 'mongoose'
import { CHAT_TYPES } from '~/constants/chat.constant'

const COLLECTION_NAME = 'chats'
const DOCUMENT_NAME = 'chat'

interface IChat {
  members: string[]
  chat_name?: string
  chat_type?: string
  chat_avatar?: string
  last_message?: string
  last_message_at?: Date
  last_message_by?: string
}

const ChatSchema = new Schema<IChat>(
  {
    members: {
      type: [String],
      required: true
    },
    chat_name: {
      type: String,
      required: false
    },
    chat_type: {
      type: String,
      required: true,
      enum: Object.values(CHAT_TYPES),
      default: 'direct'
    },
    chat_avatar: {
      type: String,
      required: false
    },
    last_message: {
      type: String,
      required: false
    },
    last_message_by: {
      type: String,
      required: false
    },
    last_message_at: {
      type: Date,
      required: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const Chat = mongoose.model<IChat>(DOCUMENT_NAME, ChatSchema)

export { Chat, IChat }
