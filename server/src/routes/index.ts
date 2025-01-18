import authRouter from './auth.route'
import userRouter from './user.route'
import chatRouter from './chat.route'
import messageRouter from './message.route'
import { Router } from 'express'

const router = Router()
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/chats', chatRouter)
router.use('/messages', messageRouter)

export default router
