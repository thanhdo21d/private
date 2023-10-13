export interface IuserContext {
  _id: string
  Department: string
  avatar: string
  createdAt: string
  email: string
  role: {
    name: string
    status: string
    updatedAt: string
  }
  transcript: []
  updatedAt: string
}

export interface userLogin {
  message?: string
  accessToken?: string
  dataUser: IuserContext[]
}
