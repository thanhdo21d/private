export interface IDepartmentType {
  _id: string
  name: string
  easy: []
  nomarl: []
  hard: []
}
export interface IDepartmentTypeDocs {
  message: string
  data: IDepartmentType[]
}
