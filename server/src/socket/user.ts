import { Server, Socket } from 'socket.io'
import { usersOnline } from '.'

const socketUser = (io: Server, socket: Socket) => {
  socket.on('add-user-online', (userId) => {
    const checkIsUserOnline = usersOnline.has(userId)
    if (!checkIsUserOnline) {
      usersOnline.set(userId, socket.id)
    }
    io.emit(
      'users-online',
      Array.from(usersOnline.entries(), (user) => {
        return {
          userId: user[0],
          socketId: user[1]
        }
      })
    )
  })
}

export default socketUser
