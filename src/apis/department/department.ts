//http://localhost:8282/department/queryAllimport { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDepartmentTypeDocs } from '~/types/department/department.type'
const DepartmentAPI = createApi({
  reducerPath: 'Department',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
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
    getExamsDepartment: builder.query<any, any>({
      query: ({ id, exams, page, limit }: any) => {
        return {
          url: `/department/queryExams/${id}`,
          method: 'GET',
          params: {
            exams: exams,
            page: page || 1,
            limit: limit || 40
          }
        }
      },
      providesTags: ['Department']
    }),
    removeExamsDepartment: builder.mutation<any, any>({
      query: ({ id, body, exmas }: any) => {
        return {
          url: `/department/removeExams/${id}`,
          method: 'DELETE',
          body: { idExams: body },
          params: {
            dynamicLevelExams: exmas
          }
        }
      },
      invalidatesTags: ['Department']
    })
  })
})
export const {
  useGetAllDepartmentQuery,
  useGetIdDepartmentQuery,
  useGetExamsDepartmentQuery,
  useRemoveExamsDepartmentMutation
} = DepartmentAPI
export default DepartmentAPI
