import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { generateRefreshTokenService, loginService, registerService } from '~/services/auth.service'
const Login = async (req: Request, res: Response) => {
  const data = req.body
  const user = await loginService(data.email, data.password)
  res.cookie('refreshToken', user.refreshToken, {
    httpOnly: true,
    secure: false,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  new SuccessResponse(StatusCodes.OK, 'Login successfully', user!).send(res)
}
const Register = async (req: Request, res: Response) => {
  const data = req.body
  const newUser = await registerService(data)
  new SuccessResponse(StatusCodes.CREATED, 'Register successfully', newUser!).send(res)
}

const generateRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  const userId = req.userId
  const newAccessToken = await generateRefreshTokenService(refreshToken!, userId)
  new SuccessResponse(StatusCodes.OK, 'Generate refresh token successfully', newAccessToken).send(res)
}
export { Login, Register, generateRefreshToken }
