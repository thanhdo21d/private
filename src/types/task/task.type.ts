export interface ItaskRole {
  _id: string
  task: string
  path: string
  role: string
}
export interface ItaskRoleDocs {
  message: string
  data: ItaskRole[]
}
