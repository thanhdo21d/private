///topicExams/create/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const topicExamsApi = createApi({
  reducerPath: 'topicExams',
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
  tagTypes: ['topicExams'],
  endpoints: (builder) => ({
    // createTopicExamsApi: builder.mutation<any, any>({
    //   query: ({
    //     id,
    //     categoriesInfo,
    //     name,
    //     startDate,
    //     endDate,
    //     time,
    //     loopQuestion,
    //     user,
    //     isEdit,
    //     keepCreating
    //   }: {
    //     id: string
    //     categoriesInfo: any[]
    //     name: string
    //     startDate: string
    //     endDate: string
    //     time: string
    //     loopQuestion: string
    //     user: any[]
    //     isEdit: string
    //     keepCreating: string | null
    //   }) => {
    //     return {
    //       url: `/topicExams/create/${id}`,
    //       method: 'POST',
    //       body: {
    //         name: name,
    //         categoriesInfo: categoriesInfo,
    //         startDate: startDate,
    //         endDate: endDate,
    //         time: time,
    //         user: user,
    //         loopQuestion: loopQuestion || null,
    //         isEdit: isEdit || '0',
    //         keepCreating: keepCreating || null
    //       }
    //     }
    //   },
    //   invalidatesTags: ['topicExams']
    // }),
    getQuestionStart: builder.query<any[], string>({
      query: (id: string) => {
        return {
          url: `/start/${id}`,
          method: 'GET'
        }
      },
      providesTags: ['topicExams']
    }),
    sessionExamsQuestion: builder.query<any[], { id: string }>({
      query: ({ id }: { id: string }) => {
        return {
          url: `/examstatus/${id}`,
          method: 'GET'
        }
      },
      providesTags: ['topicExams']
    }),
    submitExamsQuestion: builder.mutation<any[], { id: string; data: any; mailUser: string; nameExams: string }>({
      query: ({ id, data, mailUser, nameExams }: { id: string; data: any; mailUser: string; nameExams: string }) => {
        console.log(data, 'ok')
        return {
          url: `/submit/${id}`,
          method: 'POST',
          body: {
            data: data
          },
          params: {
            mailUser: mailUser,
            nameExams: nameExams
          }
        }
      },
      invalidatesTags: ['topicExams']
    }),
    getDetailListExam: builder.query<any[], { id: string }>({
      query: ({ id }: { id: string }) => {
        return {
          url: `/get/details/listExam/${id}`,
          method: 'GET'
        }
      },
      providesTags: ['topicExams']
    }),
    getAllUserStartExams: builder.query<any[], { searchQuery: string; id: string }>({
      query: ({ searchQuery, id }: { searchQuery: string; id: string }) => {
        return {
          url: 'check/user/start/' + id,
          method: 'GET',
          params: {
            searchQuery: searchQuery || ''
          }
        }
      },
      providesTags: ['topicExams']
    }),
    getExamsTl: builder.query<any[], { id: string }>({
      query: ({ id }: { id: string }) => {
        return {
          url: 'getListExams/' + id,
          method: 'GET'
        }
      },
      providesTags: ['topicExams']
    }),
    DoneExamsTl: builder.mutation<any[], { id: string }>({
      query: ({ id }: { id: string }) => {
        return {
          url: '/done-commentByAdmin/' + id,
          method: 'POST'
        }
      },
      invalidatesTags: ['topicExams']
    }),
    updateStatusExamsUser: builder.mutation<any[], { id: string; status: string; commentByAdmin: string }>({
      query: ({ id, status, commentByAdmin }: { id: string; status: string; commentByAdmin: string }) => {
        return {
          url: `update/status/exams/${id}`,
          method: 'POST',
          body: {
            status: status,
            commentByAdmin: commentByAdmin
          }
        }
      },
      invalidatesTags: ['topicExams']
    }),
    updateCommentAdminExamsUser: builder.mutation<
      any[],
      { id: string; index: string; dataComment: string; point: string }
    >({
      query: ({ id, index, dataComment, point }: { id: string; index: string; dataComment: string; point: string }) => {
        return {
          url: `commentByAdmin/${id}`,
          method: 'POST',
          body: {
            index: index,
            dataComment: dataComment,
            point: point
          }
        }
      },
      invalidatesTags: ['topicExams']
    })
  })
})
export const {
  // useCreateTopicExamsApiMutation,
  useGetQuestionStartQuery,
  useSessionExamsQuestionQuery,
  useSubmitExamsQuestionMutation,
  useGetDetailListExamQuery,
  useGetAllUserStartExamsQuery,
  useUpdateStatusExamsUserMutation,
  useGetExamsTlQuery,
  useUpdateCommentAdminExamsUserMutation,
  useDoneExamsTlMutation
} = topicExamsApi
export default topicExamsApi
