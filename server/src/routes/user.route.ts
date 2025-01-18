import { Router } from 'express'
import { getAllUsers } from '~/controllers/user.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'

const userRouter = Router()
userRouter.use(asyncErrorHandler(authMiddleware))
//Authenticating the user before accessing the route
userRouter.get('/', asyncErrorHandler(getAllUsers))

export default userRouter
