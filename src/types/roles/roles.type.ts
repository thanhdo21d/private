export interface IRole {
  _id: string
  name: string
  status: string
  updatedAt: number
  users: string[]
}

export interface IRoleDocs {
  message: string
  data: IRole[]
}
export interface IRoleDoc {
  message: string
  data: {
    _id: string
    name: string
    status: string
    updatedAt: number
    users: string[]
  }
}
