import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
import { IUser, User } from '~/models/user.model'
import { registerValidation } from '~/validations/auth.validation'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import randtoken from 'rand-token'
dotenv.config()

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const generateToken = async (payload: object) => {
  const acccessToken = await jwt.sign(payload, process.env.SECRET_PASSWORD!, { expiresIn: process.env.EXPIRE_IN })
  return acccessToken
}

const validateToken = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_PASSWORD!)
    return decoded
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new ErrorResponse(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  }
}

const validateTokenV2 = async (token: string) => {
  try {
    const decoded = await jwt.verify(token, process.env.SECRET_PASSWORD!, { ignoreExpiration: true })
    return decoded
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new ErrorResponse(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  }
}
const loginService = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Email or password is wrong')
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'Email or password is wrong')
  const accessToken = await generateToken({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname
  })
  const refreshToken = randtoken.generate(Number(process.env.JWT_REFRESH_TOKEN_SIZE) || 64)
  user.refreshToken = refreshToken
  await user.save()

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

const generateRefreshTokenService = async (refreshToken: string, userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new ErrorResponse(StatusCodes.BAD_REQUEST, 'User not found')
  if (user.refreshToken !== refreshToken) throw new ErrorResponse(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED)
  const payload = { id: user._id, email: user.email, firstname: user.firstname, lastname: user.lastname }
  const newAccessToken = await generateToken(payload)
  return {
    ...payload,
    accessToken: newAccessToken
  }
}
export { loginService, registerService, validateToken, validateTokenV2, generateToken, generateRefreshTokenService }
