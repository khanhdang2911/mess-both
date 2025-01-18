import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { createMessageService, GetMessagesByChatService } from '~/services/message.service'
const CreateMessage = async (req: Request, res: Response) => {
  const data = req.body
  const userId = req.userId
  const newMessage = await createMessageService(data, userId)
  new SuccessResponse(StatusCodes.CREATED, 'Message created successfully', newMessage!).send(res)
}
const GetMessagesByChat = async (req: Request, res: Response) => {
  const userId = req.userId
  const chat_id = req.params.chat_id
  const messages = await GetMessagesByChatService(userId, chat_id)
  new SuccessResponse(StatusCodes.OK, 'Messages fetched successfully', messages).send(res)
}

export { CreateMessage, GetMessagesByChat }
