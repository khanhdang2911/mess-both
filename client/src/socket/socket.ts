import { io } from 'socket.io-client'
const URL = 'http://localhost:4000'

export const socketUser = io(URL)
export const socketChat = io(URL)
