///topicExams/create/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const topicExamsApi = createApi({
  reducerPath: 'topicExams',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['topicExams'],
  endpoints: (builder) => ({
    createTopicExamsApi: builder.mutation<any, any>({
      query: ({
        id,
        categoriesInfo,
        name,
        startDate,
        endDate,
        time,
        loopQuestion,
        user
      }: {
        id: string
        categoriesInfo: any[]
        name: string
        startDate: string
        endDate: string
        time: string
        loopQuestion: string
        user: any[]
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
            loopQuestion: loopQuestion || null
          }
        }
      },
      invalidatesTags: ['topicExams']
    })
  })
})
export const { useCreateTopicExamsApiMutation } = topicExamsApi
export default topicExamsApi
