import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const AnalyticsAdmin = createApi({
  reducerPath: 'analyticsAdmin',
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
  tagTypes: ['analyticsAdmin'],
  endpoints: (builder) => ({
    getAnalyticAdmin: builder.query<any, void>({
      query: () => {
        return {
          url: `/analytics/admin`
        }
      },
      providesTags: ['analyticsAdmin']
    })
  })
})
export const { useGetAnalyticAdminQuery } = AnalyticsAdmin
export default AnalyticsAdmin
