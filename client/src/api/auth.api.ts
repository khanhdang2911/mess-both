import axios, { refreshInstance } from '../config/httpRequest'
import { IUserLogin, IUserRegister } from '../interfaces/User'

const register = async (data: IUserRegister) => {
  const response = await axios.post('/auth/register', data)

  return response.data
}

const login = async (data: IUserLogin) => {
  const response = await axios.post('/auth/login', data)

  return response.data
}

const logout = async () => {
  const response = await axios.get('/auth/logout')
  return response.data
}

const refreshToken = async () => {
  const response = await refreshInstance.post(
    '/auth/refresh-token',
    {},
    {
      withCredentials: true
    }
  )
  return response.data
}

export { register, login, logout, refreshToken }
