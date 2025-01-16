import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { loginService, registerService } from '~/services/auth.service'
const Login = async (req: Request, res: Response) => {
  const data = req.body
  const user = await loginService(data.email, data.password)
  new SuccessResponse(StatusCodes.OK, 'Login successfully', user!).send(res)
}
const Register = async (req: Request, res: Response) => {
  const data = req.body
  const newUser = await registerService(data)
  new SuccessResponse(StatusCodes.CREATED, 'Register successfully', newUser!).send(res)
}
export { Login, Register }
