import { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const RoleApi = createApi({
  reducerPath: 'Role',
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
  tagTypes: ['role'],
  endpoints: (builder) => ({
    searchRoleApiGET: builder.query<any, any>({
      query: (content) => {
        return {
          url: '/search/role',
          method: 'GET',
          params: {
            content: content
          }
        }
      },
      providesTags: ['role']
    }),
    getAllRoles: builder.query<IRoleDocs[], { sort: string; page: string | number }>({
      query: ({ sort, page }) => {
        return {
          url: '/roles',
          method: 'GET',
          params: {
            sort: sort,
            page: page || 1
          }
        }
      },
      providesTags: ['role']
    }),
    getIdRoles: builder.query<IRoleDoc, { id: string; search: string }>({
      query: ({ id, search }: { id: string; search: string }) => {
        return {
          url: `/role/${id}`,
          params: {
            search: search || ''
          }
        }
      },
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
    }),
    getTaskRoleForUser: builder.query<any, string>({
      query: (id) => {
        return {
          url: `/get-task/user/${id}`
        }
      },
      providesTags: ['role']
    })
  })
})
export const {
  useGetAllRolesQuery,
  useDeleteRoleMutation,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useGetIdRolesQuery,
  useSearchRoleApiGETQuery,
  useGetTaskRoleForUserQuery
} = RoleApi
export default RoleApi
