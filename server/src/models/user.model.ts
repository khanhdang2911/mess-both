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
      required: true
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female']
    },
    role: {
      type: String,
      required: true,
      enum: [...ROLES]
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const User = mongoose.model<IUser>(DOCUMENT_NAME, UserSchema)

export { User, IUser }
