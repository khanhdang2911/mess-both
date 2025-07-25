import app from '~/app'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import socketHandlers from '~/socket'
dotenv.config()

const PORT = process.env.PORT || 8999

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
const io = new Server(server, {
  cors: {
    origin: process.env.FE_URL
  }
})
socketHandlers(io)
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Closing server')
    process.exit(0)
  })
})
