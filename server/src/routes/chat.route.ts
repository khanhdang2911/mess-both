import { Router } from 'express'
import { CreateChat, GetChatById, GetChatsByUser } from '~/controllers/chat.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'
const chatRouter = Router()
chatRouter.use(asyncErrorHandler(authMiddleware))
//Authentication routes
chatRouter.post('/create', asyncErrorHandler(CreateChat))
chatRouter.get('/', asyncErrorHandler(GetChatsByUser))
chatRouter.get('/:id', asyncErrorHandler(GetChatById))
export default chatRouter
