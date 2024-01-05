///query-loggers

//http://localhost:8282/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const loggersAPI = createApi({
  reducerPath: 'Loggers',
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
  tagTypes: ['Loggers'],
  endpoints: (builder) => ({
    getAllLoggers: builder.query<any, any>({
      query: ({ page, limit, startDate, endDate, search }) => {
        return {
          url: '/query-loggers',
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            startDate: startDate,
            endDate: endDate,
            search: search || ''
          }
        }
      },
      providesTags: ['Loggers']
    }),
    removeLoggers: builder.mutation<any, any>({
      query: ({ time }: { time: number }) => {
        return {
          url: '/delete-loggers/time',
          method: 'DELETE',
          params: {
            days: time
          }
        }
      },
      invalidatesTags: ['Loggers']
    })
  })
})
export const { useGetAllLoggersQuery, useRemoveLoggersMutation } = loggersAPI
export default loggersAPI
