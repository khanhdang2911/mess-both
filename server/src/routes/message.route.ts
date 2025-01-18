import { Router } from 'express'
import { CreateMessage } from '~/controllers/mesage.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'
const messageRouter = Router()
messageRouter.use(asyncErrorHandler(authMiddleware))
//Authentication route
messageRouter.post('/create', asyncErrorHandler(CreateMessage))
export default messageRouter
