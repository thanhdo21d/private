//makingExams
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const makingExamDepartmentApi = createApi({
  reducerPath: 'makingExamDepartment',
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
  tagTypes: ['makingExamDepartment'],
  endpoints: (builder) => ({
    getMakingExamsDepartMent: builder.query<any[], { id: string; marking: string; nameExams: string }>({
      query: ({ id, marking, nameExams }: { id: string; marking: string; nameExams: string }) => {
        return {
          url: `/makingExams/${id}`,
          method: 'GET',
          params: {
            marking: marking || '0',
            nameExams: nameExams || ''
          }
        }
      },
      providesTags: ['makingExamDepartment']
    })
  })
})
export const { useGetMakingExamsDepartMentQuery } = makingExamDepartmentApi
export default makingExamDepartmentApi
