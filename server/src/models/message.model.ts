import mongoose, { Schema } from 'mongoose'
import { MESSAGE_TYPES } from '~/constants/message.constant'

const COLLECTION_NAME = 'messages'
const DOCUMENT_NAME = 'message'

interface IMessage {
  chat_id: string
  type: 'text' | 'image' | 'video' | 'file'
  content: string
  sender_id: string
  is_deleted?: boolean
  is_edited?: boolean
}

const MessageSchema = new Schema<IMessage>(
  {
    chat_id: {
      type: String,
      required: true,
      ref: 'chat'
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(MESSAGE_TYPES),
      default: 'text'
    },
    content: {
      type: String,
      required: true
    },
    sender_id: {
      type: String,
      required: true,
      ref: 'user'
    },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false
    },
    is_edited: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const Message = mongoose.model<IMessage>(DOCUMENT_NAME, MessageSchema)

export { Message, IMessage }
