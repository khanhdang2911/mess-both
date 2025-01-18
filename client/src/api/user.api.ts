import axios from '../config/httpRequest'

const getAllUsers = async () => {
  const response = await axios.get('/users')
  return response.data
}
export { getAllUsers }
