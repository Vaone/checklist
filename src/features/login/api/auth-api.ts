import { BaseResponseType } from 'common/components/Types/common.types'
import { instance } from '../../../app/api/baseAPI'

export const authAPI = {
  getMe: () => instance.get<BaseResponseType<T_User>>('auth/me'),
  login: (data: D_User) => instance.post<BaseResponseType<{ userId: number }>>('auth/login', data),
  logout: () => instance.delete<BaseResponseType>('auth/login'),
}

// types
type T_User = {
  id: number
  email: string
  login: string
}
export type D_User = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: boolean
}
