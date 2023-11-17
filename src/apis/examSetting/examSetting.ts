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
    }),
    getTopicExamsID: builder.query<any, string>({
      query: (id: string) => `/topicExams/get/${id}`,
      providesTags: ['ExamSetting']
    }),
    getIdExamsCategories: builder.query<any, string>({
      query: (id: string) => `/examsk/getId/${id}`,
      providesTags: ['ExamSetting']
    }),
    removeTopicExams: builder.mutation<any, any>({
      query: ({ id, idkt }: { id: string; idkt: string }) => {
        return {
          url: `/remove/TopicExams/${id}/${idkt}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['ExamSetting']
    }),
    createTopicExams: builder.mutation<any, any>({
      query: ({ id, body }: { id: string; body: any }) => {
        return {
          url: `/topicExams/create/${id}`,
          method: 'POST',
          body: body
        }
      },
      invalidatesTags: ['ExamSetting']
    })
  })
})
export const {
  useCreateExamsDepartmentMutation,
  useGetAllExamsCategoriesQuery,
  useRemoveExamsCategoriesMutation,
  useGetIdExamsCategoriesQuery,
  useRemoveTopicExamsMutation,
  useCreateTopicExamsMutation,
  useGetTopicExamsIDQuery
} = ExamSetting
export default ExamSetting
