export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
export interface DataListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'updateAt'
  order?: 'asc' | 'desc'
  exclude?: string
  name?: string
  category?: string
}
