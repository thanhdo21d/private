export interface IRole {
  _id: string
  name: string
  status: string
  updatedAt: number
  users: string[]
  totalPages?: number | string
}

export interface IRoleDocs {
  message: string
  data: IRole[]
  totalPages: number | string
  totalProducts: number | string
}
export interface IRoleDoc {
  message: string
  data: {
    _id: string
    name: string
    status: string
    updatedAt: number
    users: string[]
    tasks: string[]
  }
}
