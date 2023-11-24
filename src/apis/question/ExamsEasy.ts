//api http://localhost:8282/ExamsRoutes/easy

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const categoryHistoryAPI = createApi({
  reducerPath: 'history',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
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
