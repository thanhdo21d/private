import { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { responseUser } from '~/types/users/users.types'
import { SigninForm } from '~/schemas/login.schemas'
const UserLoginApi = createApi({
  reducerPath: 'UsersLogin',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['UsersLogin'],
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<responseUser, SigninForm>({
      query: ({ ...rest }) => ({
        url: 'sign-in',
        body: rest,
        method: 'POST',
        credentials: 'include'
      })
    })
  })
})
export const { useGetAccessTokenMutation } = UserLoginApi
export default UserLoginApi
