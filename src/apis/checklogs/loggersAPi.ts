///query-loggers

//http://localhost:8282/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const loggersAPI = createApi({
  reducerPath: 'Loggers',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['Loggers'],
  endpoints: (builder) => ({
    getAllLoggers: builder.query<any[], any>({
      query: ({ page, limit, startDate, endDate }) => {
        return {
          url: '/query-loggers',
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            startDate: startDate,
            endDate: endDate
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
