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
            dynamicLevelExams: exmas || 'easy'
          }
        }
      },
      invalidatesTags: ['Department']
    }),
    getDetailsExams: builder.query<any, any>({
      query: ({ idDepartment, exams }: { idDepartment: string; exams: string }) => {
        return {
          url: `/examsDetails/${idDepartment}`,
          params: {
            exams: exams || 'easy'
          }
        }
      },
      providesTags: ['Department']
    }),
    dropDbExams: builder.mutation<void, any>({
      query: ({ idDepartment, examsLevel }: { idDepartment: string; examsLevel: string }) => {
        return {
          url: `/ExamsRoutes/dropdb/${idDepartment}`,
          method: 'POST',
          params: {
            queryExamsLevelCheck: examsLevel
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
  useRemoveExamsDepartmentMutation,
  useGetDetailsExamsQuery,
  useDropDbExamsMutation
} = DepartmentAPI
export default DepartmentAPI
