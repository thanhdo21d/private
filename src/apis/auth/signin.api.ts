import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  RootState,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { SigninForm } from '~/schemas/login.schemas'
import { refreshUser } from '~/store/slice/Auth.slice'
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
export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions)
  console.log(result, 'result')
  if (result.meta?.response?.status != 200) {
    const refreshToken = await baseQuery('/refreshToken', api, extraOptions) // Request refreshToken
    console.log(refreshToken.data, refreshToken, 'ple')
    if (refreshToken.data) {
      const { user } = (api.getState() as any).persistedReducer.auth
      console.log(user, 'user')
      api.dispatch(refreshUser({ ...refreshToken.data, user })) // Cấp lại AccessToken
    }
  }
  return result
}
const UserLoginApi = createApi({
  reducerPath: 'UsersLogin',
  baseQuery: baseQueryWithReauth,
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
