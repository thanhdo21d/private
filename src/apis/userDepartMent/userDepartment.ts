///get-user/category
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const UserDepartMentApi = createApi({
  reducerPath: 'otherUser',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['otherUser'],
  endpoints: (builder) => ({
    getIdUserDepartMent: builder.query<any, any>({
      query: ({ id, page, limit, search }: { id: string; page: string; limit: string; search: string }) => {
        return {
          url: `/get-user/category/${id}`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            search: search || ''
          }
        }
      },
      providesTags: ['otherUser']
    }),
    removeUserDepartMent: builder.mutation<any, any>({
      query: ({ id, idUser }: { id: string; idUser: string }) => {
        return {
          url: `/remove-user/category/${id}`,
          method: 'DELETE',
          body: {
            idUser: [idUser]
          }
        }
      },
      invalidatesTags: ['otherUser']
    }),
    insertUserDepartMent: builder.mutation<any, any>({
      query: ({ id, idUser }: { id: string; idUser: string }) => {
        return {
          url: `/insert-user/category/${id}`,
          method: 'POST',
          body: {
            idUser: [idUser]
          }
        }
      },
      invalidatesTags: ['otherUser']
    })
  })
})
export const { useGetIdUserDepartMentQuery, useRemoveUserDepartMentMutation, useInsertUserDepartMentMutation } =
  UserDepartMentApi
export default UserDepartMentApi
