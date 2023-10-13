import { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const RoleApi = createApi({
  reducerPath: 'Role',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['role'],
  endpoints: (builder) => ({
    getAllRoles: builder.query<IRoleDocs[], void>({
      query: () => '/roles',
      providesTags: ['role']
    }),
    getIdRoles: builder.query<IRoleDoc, string>({
      query: (id: string) => `/role/${id}`,
      providesTags: ['role']
    }),

    deleteRole: builder.mutation({
      query: (id: string) => ({
        url: `/role/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['role']
    }),

    addRole: builder.mutation({
      query: (role: Pick<IRole, 'name'>) => ({
        url: '/role',
        method: 'POST',
        body: role
      }),
      invalidatesTags: ['role']
    }),

    updateRole: builder.mutation<IRole, IRole>({
      query: (role) => {
        return {
          url: `/role/${role._id}`,
          method: 'PUT',
          body: role
        }
      },
      invalidatesTags: ['role']
    })
  })
})
export const {
  useGetAllRolesQuery,
  useDeleteRoleMutation,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useGetIdRolesQuery
} = RoleApi
export default RoleApi
