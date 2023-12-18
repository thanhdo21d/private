import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const AnalyticsUser = createApi({
  reducerPath: 'analyticsUser',
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
  tagTypes: ['analyticsUser'],
  endpoints: (builder) => ({
    getAnalyticUser: builder.query({
      query: ({ id }) => {
        return {
          url: `/analytics/user/${id}`,
          params: {
            search: ''
          }
        }
      },
      providesTags: ['analyticsUser']
    })
  })
})
export const { useGetAnalyticUserQuery } = AnalyticsUser
export default AnalyticsUser
