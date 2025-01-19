import { IChatCreate } from '../interfaces/Chat'
import axios from '../config/httpRequest'
const createChat = async (chat: IChatCreate) => {
  const response = await axios.post('/chats/create', chat)
  return response.data
}
const getChatsByUser = async () => {
  const response = await axios.get(`/chats`)
  return response.data
}
const getChatById = async (chatId: string) => {
  const response = await axios.get(`/chats/${chatId}`)
  return response.data
}
export { createChat, getChatsByUser, getChatById }
