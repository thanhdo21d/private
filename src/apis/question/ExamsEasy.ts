//api http://localhost:8282/ExamsRoutes/easy

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
export interface IhistoryForm {
  _id: string
  categoriesInfo: any[]
  name: string
  idCheck: string
  time: number | string
  user: string[]
  status: boolean
  loopQuestion: string
  endDate: string
  startDate: string
}
const categoryHistoryAPI = createApi({
  reducerPath: 'history',
  keepUnusedDataFor: 0,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API,
    prepareHeaders: (headers, { getState }) => {
      console.log(getState())
      const token = Cookies.get('token')
      console.log(token, 'token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes: ['history'],
  endpoints: (builder) => ({
    getHistoryCategories: builder.query<IhistoryForm, string>({
      query: (id) => {
        return {
          url: `/history/${id}`,
          method: 'GET'
        }
      },
      keepUnusedDataFor: 0,
      providesTags: ['history']
    })
  })
})
export const { useGetHistoryCategoriesQuery } = categoryHistoryAPI
export default categoryHistoryAPI
