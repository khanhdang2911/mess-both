import express from 'express'
import cors from 'cors'
import mongoInstance from './dbs/mongo.init'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
mongoInstance

export default app
