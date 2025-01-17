import { Router } from 'express'
import { generateRefreshToken, Login, Logout, Register } from '~/controllers/auth.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authMiddleware from '~/middlewares/auth.middleware'
import authV2Middleware from '~/middlewares/authV2.middleware'

const authRouter = Router()

authRouter.post('/login', asyncErrorHandler(Login))
authRouter.post('/register', asyncErrorHandler(Register))
authRouter.get('/logout', asyncErrorHandler(authMiddleware), asyncErrorHandler(Logout))
authRouter.post('/refresh-token', asyncErrorHandler(authV2Middleware), asyncErrorHandler(generateRefreshToken))
export default authRouter
