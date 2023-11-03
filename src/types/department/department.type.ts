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

export interface category {
  _id: string
  name: string
  parentCheck: string
  children: []
  easy: []
}
export interface categories {
  message: string
  data: category[]
}
