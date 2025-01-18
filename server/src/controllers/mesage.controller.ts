import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { createMessageService } from '~/services/message.service'
const CreateMessage = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.userId
  const newMessage = await createMessageService(data, userId)
  new SuccessResponse(StatusCodes.CREATED, 'Message created successfully', newMessage!).send(res)
}

export { CreateMessage }
