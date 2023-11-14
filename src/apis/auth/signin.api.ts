import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SigninForm } from '~/schemas/login.schemas'
import { userLogin } from '~/types/users/userContext'
const UserLoginApi = createApi({
  reducerPath: 'UsersLogin',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['UsersLogin'],
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<userLogin, SigninForm>({
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
