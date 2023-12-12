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
    submitExamsQuestion: builder.mutation<any[], { id: string; data: any }>({
      query: ({ id, data }: { id: string; data: any }) => {
        console.log(data, 'ok')
        return {
          url: `/submit/${id}`,
          method: 'POST',
          body: {
            data: data
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
  useSubmitExamsQuestionMutation
} = topicExamsApi
export default topicExamsApi
