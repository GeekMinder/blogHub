import axios from 'axios'
import { TokenService } from '../auth/auth'

const request = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 60 * 1000,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = TokenService.getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      // do something
      switch (error.response.code) {
        case 401:
          TokenService.removeToken()
          // 重定向到登录页
          window.location.href = '/login'
          break
        case 403:
          // do something
          break
        case 404:
          // do something
          break
        case 500:
          // do something
          break
        default:
          // do something
          break
      }
    }
    return Promise.reject(error)
  },
)

export default request
