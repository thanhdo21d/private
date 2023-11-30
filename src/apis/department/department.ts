import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { IDepartmentTypeDocs } from '~/types/department/department.type'
const DepartmentAPI = createApi({
  reducerPath: 'Department',
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
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getAllDepartment: builder.query<IDepartmentTypeDocs[], void>({
      query: () => {
        return {
          url: '/department/queryAll',
          method: 'GET'
        }
      },
      providesTags: ['Department']
    }),
    getIdDepartment: builder.query<any, string>({
      query: (id: string) => `/department/query/${id}`,
      providesTags: ['Department']
    }),

    getDetailsExams: builder.query<any, any>({
      query: ({ idDepartment }: { idDepartment: string }) => {
        return {
          url: `/examsDetails/${idDepartment}`
        }
      },
      providesTags: ['Department']
    }),
    dropDbExams: builder.mutation<void, any>({
      query: ({ idDepartment }: { idDepartment: string }) => {
        return {
          url: `/ExamsRoutes/dropdb/${idDepartment}`,
          method: 'POST'
        }
      },
      invalidatesTags: ['Department']
    }),
    changeRoleOtherAdmin: builder.mutation<void, { id: string; body: string[] }>({
      query: ({ id, body }) => {
        return {
          url: `/changeAdminDepartment/${id}`,
          method: 'PUT',
          body: { idDepartMent: body }
        }
      },
      invalidatesTags: ['Department']
    })
  })
})
export const {
  useGetAllDepartmentQuery,
  useGetIdDepartmentQuery,
  useGetDetailsExamsQuery,
  useDropDbExamsMutation,
  useChangeRoleOtherAdminMutation
} = DepartmentAPI
export default DepartmentAPI
