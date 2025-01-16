import express from 'express'
import cors from 'cors'
import mongoInstance from './dbs/mongo.init'
import { handleError, handleNotFound } from './middlewares/handleError'
import router from './routes'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', router)
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
mongoInstance
app.use(handleNotFound)
app.use(handleError)
export default app
