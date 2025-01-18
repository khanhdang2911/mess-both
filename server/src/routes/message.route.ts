import { Router } from 'express'
import { CreateMessage, GetMessagesByChat } from '~/controllers/mesage.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'
const messageRouter = Router()
messageRouter.use(asyncErrorHandler(authMiddleware))
//Authentication route
messageRouter.post('/create', asyncErrorHandler(CreateMessage))
messageRouter.get('/get-messages-by-chat/:chat_id', asyncErrorHandler(GetMessagesByChat))
export default messageRouter
