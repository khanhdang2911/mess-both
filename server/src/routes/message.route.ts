import { Router } from 'express'
import { changeStatusMessage, CreateMessage, GetMessagesByChat } from '~/controllers/mesage.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'
const messageRouter = Router()
messageRouter.use(asyncErrorHandler(authMiddleware))
//Authentication route
messageRouter.post('/create', asyncErrorHandler(CreateMessage))
messageRouter.get('/get-messages-by-chat/:chat_id', asyncErrorHandler(GetMessagesByChat))
messageRouter.put('/change-status-message/:message_id', asyncErrorHandler(changeStatusMessage))
export default messageRouter
