import axios from '../config/httpRequest'

const getAllUsers = async () => {
  const response = await axios.get('/users')
  return response.data
}
const searchUser = async (keyword: string) => {
  const response = await axios.get(`/users/search/${keyword}`)
  return response.data
}
export { getAllUsers, searchUser }
