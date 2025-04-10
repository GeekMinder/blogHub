import axios from 'axios'
import { TokenService } from '../auth/auth'
import { Message } from '@arco-design/web-vue'

const request = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 60 * 1000,
})

// 是否正在刷新token
let isRefreshing = false
// 等待刷新的请求队列
let requests: ((token: string) => void)[] = []

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
  response => response.data,
  async error => {
    const { response, status } = error
    if (!response) {
      Message.error('网络错误，请稍后重试')
      return Promise.reject(error)
    }

    if (status === 401) {
      const refreshToken = TokenService.getRefreshToken()
      // 没有 refreshToken，跳转登录页
      if (!refreshToken) {
        TokenService.clearTokens()
        window.location.href = '/login'
        return Promise.reject(error)
      }

      // 刷新 token
      if (!isRefreshing) {
        isRefreshing = true
        try {
          // 尝试刷新 token
          const res = await axios.post('/auth/refresh', {
            refresh_token: refreshToken,
          })
          const { token, refresh_token } = res.data
          // 更新 token
          TokenService.setToken(token)
          // 更新 refresh_token
          TokenService.setRefreshToken(refresh_token)
          // 重试队列中的请求
          requests.forEach(cb => cb(token))
          requests = []

          // 重试当前请求
          error.config.headers['Authorization'] = `Bearer ${token}`
          return request(error.config)
        } catch (refreshError) {
          // 刷新失败，清空 token 并跳转登录
          TokenService.clearTokens()
          location.href = '/login'
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
      return new Promise(resolve => {
        requests.push((token: string) => {
          error.config.headers['Authorization'] = `Bearer ${token}`
          resolve(request(error.config))
        })
      })
    }

    // 其他错误
    switch (status) {
      case 403:
        Message.error('没有权限')
        break
      case 404:
        Message.error('请求的资源不存在')
        break
      case 500:
        Message.error('服务器错误')
        break
      default:
        Message.error(response.data?.message || '请求失败')
    }

    return Promise.reject(error)
  },
)

export default request
