import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDepartmentTypeDocs } from '~/types/department/department.type'
const ExamSetting = createApi({
  reducerPath: 'ExamSetting',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['ExamSetting'],
  endpoints: (builder) => ({
    createExamsDepartment: builder.mutation<any, any>({
      query: ({ id, name, startDate, endDate }: { id: string; name: string; startDate: string; endDate: string }) => {
        return {
          url: `/examsktRoutes/create/${id}`,
          method: 'POST',
          body: {
            name: name,
            startDate: startDate,
            endDate: endDate
          }
        }
      },
      invalidatesTags: ['ExamSetting']
    }),
    removeExamsCategories: builder.mutation<any, any>({
      query: ({ id, idCate }: { id: string; idCate: string }) => {
        return {
          url: `/examsktRoutes/remove/${id}/${idCate}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['ExamSetting']
    }),
    getAllExamsCategories: builder.query<any, string>({
      query: (id: string) => `/examsktRoutes/get/${id}`,
      providesTags: ['ExamSetting']
    })
  })
})
export const { useCreateExamsDepartmentMutation, useGetAllExamsCategoriesQuery, useRemoveExamsCategoriesMutation } =
  ExamSetting
export default ExamSetting
