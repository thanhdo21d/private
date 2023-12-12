import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { IDepartmentTypeDocs } from '~/types/department/department.type'
const ExamSetting = createApi({
  reducerPath: 'ExamSetting',
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
    getAllExamsCategories: builder.query<any, any>({
      query: ({ id, page, limit, search }: { id: string; page: string; limit: string; search: string }) => {
        return {
          url: `/examsktRoutes/get/${id}`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            search: search || ''
          }
        }
      },
      providesTags: ['ExamSetting']
    }),
    getTopicExamsID: builder.query<any, { id: string; search: string }>({
      query: ({ id, search }: { id: string; search: string }) => {
        return {
          url: `/topicExams/get/${id}`,
          method: 'GET',
          params: {
            search: search || ''
          }
        }
      },
      providesTags: ['ExamSetting']
    }),
    getIdExamsCategories: builder.query<any, any>({
      query: ({ id, page, limit, search }: { id: string; page: string; limit: string; search: string }) => {
        return {
          url: `/examsk/getId/${id}`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            search: search || ''
          }
        }
      },
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
    }),
    editTopicExamId: builder.mutation<any, any>({
      query: ({
        id,
        name,
        status,
        startDate,
        endDate,
        idQuestion,
        time,
        add,
        remove
      }: {
        id: string
        name: string
        status: string
        startDate: string
        endDate: string
        idQuestion: string[]
        time: string
        add: string[]
        remove: string[]
      }) => {
        return {
          url: `/topicExams/edit/${id}`,
          method: 'PATCH',
          body: {
            name: name || 'Updated Exam Name',
            status: status || 'inactive',
            startDate: startDate || '2023-12-01T00:00:00.000Z',
            endDate: endDate || '2023-12-15T00:00:00.000Z',
            idQuestion: idQuestion || '654b3a683378a6fd9c34637d',
            time: time,
            users: {
              add: add || ['user1_id', 'user2_id'],
              remove: remove || ['user3_id', 'user4_id']
            }
          }
        }
      },
      invalidatesTags: ['ExamSetting']
    }),
    createTopicExamsApi: builder.mutation<any, any>({
      query: ({
        id,
        categoriesInfo,
        name,
        startDate,
        endDate,
        time,
        loopQuestion,
        user,
        isEdit,
        keepCreating
      }: {
        id: string
        categoriesInfo: any[]
        name: string
        startDate: string
        endDate: string
        time: string
        loopQuestion: string
        user: any[]
        isEdit: string
        keepCreating: string | null
      }) => {
        return {
          url: `/topicExams/create/${id}`,
          method: 'POST',
          body: {
            name: name,
            categoriesInfo: categoriesInfo,
            startDate: startDate,
            endDate: endDate,
            time: time,
            user: user,
            loopQuestion: loopQuestion || null,
            isEdit: isEdit || '0',
            keepCreating: keepCreating || null
          }
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
  useGetTopicExamsIDQuery,
  useEditTopicExamIdMutation,
  useCreateTopicExamsApiMutation
} = ExamSetting
export default ExamSetting
