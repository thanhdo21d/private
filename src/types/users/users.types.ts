import { IRole } from '../roles/roles.type'
export interface IUser {
  _id?: string
  username?: string
  account?: string
  avatar?: string
  password?: string
  address?: string
  products?: string[]
  order?: string[]
  role: IRole
  email?: string
  status?: string
  accessToken?: string
  refreshToken?: string
  birthday?: Date
  grade?: number
  gender?: string
}
export interface responseUser {
  user: IUser
}
