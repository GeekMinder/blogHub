// import axios from 'axios'

// Token 相关操作
export const TokenService = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token: string) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),

  getRefreshToken: () => localStorage.getItem('refresh_token'),
  setRefreshToken: (token: string) =>
    localStorage.setItem('refresh_token', token),

  clearTokens: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
  },

  // 刷新 token
  // refreshToken: async () => {
  //   try {
  //     const response = await axios.post('/api/auth/refresh')
  //     const { token } = response.data
  //     TokenService.setToken(token)
  //     return token
  //   } catch (error) {
  //     TokenService.removeToken()
  //     throw error
  //   }
  // },
}
