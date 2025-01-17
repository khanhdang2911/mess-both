import axios, { InternalAxiosRequestConfig } from 'axios'
import { store } from '../redux/store'
import { jwtDecode } from 'jwt-decode'
import { refreshToken } from '../api/auth.api'
import authSlice from '../redux/authSlice'
const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true
})

const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true
})
const handleRefreshToken = async (config: InternalAxiosRequestConfig<any>) => {
  try {
    const auth = store.getState().auth
    config.headers.Authorization = `Bearer ${auth.user?.accessToken}`
    const accessToken = auth.user?.accessToken
    if (accessToken) {
      const decodedToken = await jwtDecode(accessToken)
      const currentTime = Date.now() / 1000
      if (decodedToken?.exp && currentTime - decodedToken.exp > 0) {
        const response = await refreshToken()
        const newAccessToken = response.data.accessToken
        config.headers.Authorization = `Bearer ${newAccessToken}`
        store.dispatch(authSlice.actions.setNewAccessToken(newAccessToken))
      }
    }
  } catch (error) {
    return Promise.reject(error)
  }
  return config
}
// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    return await handleRefreshToken(config)
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

//Refresh token interceptor
refreshInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const auth = store.getState().auth
    config.headers.Authorization = `Bearer ${auth.user?.accessToken}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
refreshInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
export { refreshInstance }
