///changeRoleUser/:id/:idRole

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const changeRoleApi = createApi({
  reducerPath: 'UpdateRole',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['UpdateRole'],
  endpoints: (builder) => ({
    updateRoleUser: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/changeRoleUser/${id}/{${id}}`,
          method: 'PUT'
        }
      },
      invalidatesTags: ['UpdateRole']
    })
  })
})
export const { useUpdateRoleUserMutation } = changeRoleApi
export default changeRoleApi
