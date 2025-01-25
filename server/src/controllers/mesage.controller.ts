import { Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { changeStatusMessageService, createMessageService, GetMessagesByChatService } from '~/services/message.service'
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
const changeStatusMessage = async (req: Request, res: Response) => {
  const userId = req.userId
  const message_id = req.params.message_id
  const chat_id = req.params.chat_id
  const message = await changeStatusMessageService(userId, message_id, chat_id)
  new SuccessResponse(StatusCodes.OK, 'Message status changed successfully', message).send(res)
}
export { CreateMessage, GetMessagesByChat, changeStatusMessage }
