import { Router } from 'express'
import { generateRefreshToken, Login, Register } from '~/controllers/auth.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'
import authV2Middleware from '~/middlewares/authV2.middleware'

const authRouter = Router()

authRouter.post('/login', asyncErrorHandler(Login))
authRouter.post('/register', asyncErrorHandler(Register))
authRouter.post('/refresh-token', asyncErrorHandler(authV2Middleware), asyncErrorHandler(generateRefreshToken))
export default authRouter
