import axios from '../config/httpRequest'
import { IMessageCreate } from '../interfaces/Message'
const createMessage = async (message: IMessageCreate) => {
  const response = await axios.post('/messages/create', message)
  return response.data
}
const getMessagesByChat = async (chat_id: string) => {
  const response = await axios.get(`/messages/get-messages-by-chat/${chat_id}`)
  return response.data
}

export { createMessage, getMessagesByChat }
