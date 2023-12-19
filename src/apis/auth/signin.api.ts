import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { SigninForm } from '~/schemas/login.schemas'
import { userLogin } from '~/types/users/userContext'
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = Cookies.get('token')
    console.log(token, 'token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})
const UserLoginApi = createApi({
  reducerPath: 'UsersLogin',
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
  tagTypes: ['UsersLogin'],
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<userLogin, SigninForm>({
      query: ({ ...rest }) => ({
        url: 'sign-in',
        body: rest,
        method: 'POST',
        credentials: 'include'
      })
    }),
    logoutApi: builder.mutation<unknown, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include'
      })
    })
  })
})
export const { useGetAccessTokenMutation, useLogoutApiMutation } = UserLoginApi
export default UserLoginApi
