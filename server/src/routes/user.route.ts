import { Router } from 'express'
import { getAllUsers, searchUser } from '~/controllers/user.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'

const userRouter = Router()
userRouter.use(asyncErrorHandler(authMiddleware))
//Authenticating the user before accessing the route
userRouter.get('/', asyncErrorHandler(getAllUsers))
userRouter.get('/search/:keyword', asyncErrorHandler(searchUser))
export default userRouter
