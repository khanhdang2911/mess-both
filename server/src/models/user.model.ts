import mongoose, { Schema } from 'mongoose'

const COLLECTION_NAME = 'users'
const DOCUMENT_NAME = 'user'

interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
  gender: string
  avatar: string
  isOnline: boolean
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
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female']
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

const User = mongoose.model<IUser>(DOCUMENT_NAME, UserSchema)

export { User, IUser }
