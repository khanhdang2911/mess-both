import mongoose, { Schema } from 'mongoose'
import { ROLES } from '~/constants/common.constant'

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'user'

interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
  refreshToken: string
  gender: string
  avatar: string
  isOnline: boolean
  role: string
}

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female']
    },
    avatar: {
      type: String,
      required: false
    },
    role: {
      type: String,
      required: true,
      enum: [...ROLES],
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const User = mongoose.model<IUser>(DOCUMENT_NAME, UserSchema)
UserSchema.index({ firstname: 'text', lastname: 'text', email: 'text' })
export { User, IUser }
