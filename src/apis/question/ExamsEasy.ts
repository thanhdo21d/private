//api http://localhost:8282/ExamsRoutes/easy

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const categoryHistoryAPI = createApi({
  reducerPath: 'history',
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
    getHistoryCategories: builder.query<any[], any>({
      query: (id) => {
        return {
          url: `/history/${id}`,
          method: 'GET'
        }
      },
      providesTags: ['history']
    })
  })
})
export const { useGetHistoryCategoriesQuery } = categoryHistoryAPI
export default categoryHistoryAPI
