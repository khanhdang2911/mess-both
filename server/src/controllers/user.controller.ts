import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { getALlUsersService } from '~/services/user.service'
const getAllUsers = async (req: Request, res: Response) => {
  const users = await getALlUsersService()
  new SuccessResponse(StatusCodes.OK, 'Get all user successfully', users).send(res)
}
export { getAllUsers }
