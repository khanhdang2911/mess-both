import { Router } from 'express'
import { Login, Register } from '~/controllers/auth.controller'
import asyncErrorHandler from '~/helpers/asyncErrorHandler'

const authRouter = Router()

authRouter.post('/login', asyncErrorHandler(Login))
authRouter.post('/register', asyncErrorHandler(Register))

export default authRouter
