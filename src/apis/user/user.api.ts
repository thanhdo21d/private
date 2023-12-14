import { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const UserApi = createApi({
  reducerPath: 'Users',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getAllUser: builder.query<any, any>({
      query: ({ limit, page, employeeCode }: { limit: string; page: string; employeeCode: string }) => {
        return {
          url: '/users',
          params: {
            limit: limit || 20,
            page: page || 1,
            employeeCode: employeeCode || ''
          }
        }
      },
      providesTags: ['Users']
    }),
    getIdUser: builder.query<any, string>({
      query: (id: string) => `/users/${id}`,
      providesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Users']
    }),
    addUser: builder.mutation({
      query: (role: Pick<IRole, 'name'>) => ({
        url: '/users',
        method: 'POST',
        body: role
      }),
      invalidatesTags: ['Users']
    }),
    updateUser: builder.mutation<any, IRole>({
      query: (role) => {
        return {
          url: `/users/${role._id}`,
          method: 'PUT',
          body: role
        }
      },
      invalidatesTags: ['Users']
    }),
    uploadImageAvatarUser: builder.mutation<any, any>({
      query: ({ id, image }: any) => {
        return {
          url: `/users/${id}`,
          method: 'PATCH',
          body: {
            avatar: image
          }
        }
      },
      invalidatesTags: ['Users']
    }),
    getExamUser: builder.query<any, string>({
      query: (id: string) => ({
        url: `/get-exam-user/${id}`,
        method: 'GET'
      }),
      providesTags: ['Users']
    })
  })
})
export const {
  useAddUserMutation,
  useGetIdUserQuery,
  useGetAllUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadImageAvatarUserMutation,
  useGetExamUserQuery
} = UserApi
export default UserApi
