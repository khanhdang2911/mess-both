import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import SuccessResponse from '~/core/success.response'
import { createChatService, getChatsByUserService } from '~/services/chat.service'

const CreateChat = async (req: Request, res: Response) => {
  const data = req.body
  const newChat = await createChatService(data)
  if (!newChat) {
    new SuccessResponse(StatusCodes.OK, 'Chat already created').send(res)
  }
  new SuccessResponse(StatusCodes.CREATED, 'Chat created successfully', newChat!).send(res)
}
const GetChatsByUser = async (req: Request, res: Response) => {
  const userId = req.userId
  const chats = await getChatsByUserService(userId)
  new SuccessResponse(StatusCodes.OK, 'Chats fetched successfully', chats).send(res)
}
export { CreateChat, GetChatsByUser }
