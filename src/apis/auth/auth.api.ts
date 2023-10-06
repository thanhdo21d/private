import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { RootState } from '~/store/root/store'
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8282',
  credentials: 'include'
  // prepareHeaders: (headers, { getState }) => {
  //   const accessToken = (getState() as RootState).persistedReducer.auth.user?.accessToken

  //   if (accessToken) {
  //     headers.set('authorization', `Bearer ${accessToken}`)
  //   }
  //   return headers
  // }
})
// export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const result = await baseQuery(args, api, extraOptions)
//   if (result.meta?.response?.status === 403) {
//     // try to get a new token
//     const refreshToken = await baseQuery('/api/refreshToken', api, extraOptions) // Request refreshToken
//     if (refreshToken.data) {
//       // store the new token
//       const { user } = (api.getState() as RootState).persistedReducer.auth
//       // api.dispatch(refreshUser({ ...refreshToken.data, user })) // Cấp lại AccessToken
//     }
//   }
//   return result
// }
