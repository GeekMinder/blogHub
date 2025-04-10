import request from './request'

export interface LoginParams {
  username: string
  password: string
}

export const login = (
  data: LoginParams,
): Promise<{
  data: {
    user: {
      username: string
      role: number
    }
    token: string
  }
  code: number
  message: string
}> => {
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const logout = () => {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}

export const signup = (
  data: LoginParams,
): Promise<{ code: number; message: string }> => {
  return request({
    url: '/auth/signup',
    method: 'post',
    data,
  })
}
