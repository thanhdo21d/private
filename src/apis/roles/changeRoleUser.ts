///changeRoleUser/:id/:idRole

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const changeRoleApi = createApi({
  reducerPath: 'UpdateRole',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['UpdateRole'],
  endpoints: (builder) => ({
    updateRoleUser: builder.mutation<any, { idUser: string; idRole: string }>({
      query: ({ idUser, idRole }) => {
        console.log(idUser, idRole)
        return {
          url: `/changeRoleUser/${idUser}/${idRole}`,
          method: 'PUT',
          body: ''
        }
      },
      invalidatesTags: ['UpdateRole']
    })
  })
})
export const { useUpdateRoleUserMutation } = changeRoleApi
export default changeRoleApi
