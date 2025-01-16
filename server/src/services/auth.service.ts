import { StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
import { IUser, User } from '~/models/user.model'
import { registerValidation } from '~/validations/auth.validation'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const generateAccessToken = async (payload: object) => {
  const acccessToken = await jwt.sign(payload, process.env.SECRET_PASSWORD!, { expiresIn: process.env.EXPIRE_IN })
  return acccessToken
}

const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Email or password is wrong')
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Email or password is wrong')
  const accessToken = await generateAccessToken({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user.toObject()

  return { ...userWithoutPassword, accessToken }
}
const registerService = async (data: IUser) => {
  const { error } = await registerValidation(data)
  if (error) throw new ErrorResponse(StatusCodes.BAD_REQUEST, error.message)
  const checkUserIsExist = await User.findOne({ email: data.email })
  if (checkUserIsExist) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Email is already exist')
  const hashedPassword = await hashPassword(data.password)
  const newUser = await User.create({
    ...data,
    password: hashedPassword
  })
  return newUser
}

export { loginService, registerService }
