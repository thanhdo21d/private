import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
const AliasApi = createApi({
  reducerPath: 'alias',
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
  tagTypes: ['alias'],
  endpoints: (builder) => ({
    queryAliasAll: builder.query({
      query: ({ id, search }) => {
        return {
          url: `/aliases/category/${id}`,
          params: {
            search: search || ''
          }
        }
      },
      providesTags: ['alias']
    }),
    removeAliasDepartment: builder.mutation({
      query: ({ id, idAlias }) => {
        return {
          url: `/remove/alias/${id}`,
          method: 'DELETE',
          body: {
            idAlias: [idAlias]
          }
        }
      },
      invalidatesTags: ['alias']
    }),

    defaultAlias: builder.mutation({
      query: ({ id, checkAlias, idCategory }) => {
        return {
          url: `/default/alias/${id}`,
          method: 'PATCH',
          body: {
            checkAlias: checkAlias
          },
          params: {
            idCategory: idCategory
          }
        }
      },
      invalidatesTags: ['alias']
    }),
    getIdAliasFolders: builder.query({
      query: (id) => {
        return {
          url: `/aliases/${id}`,
          method: 'GET'
        }
      },
      providesTags: ['alias']
    })
  })
})
export const {
  useQueryAliasAllQuery,
  useRemoveAliasDepartmentMutation,
  useDefaultAliasMutation,
  useGetIdAliasFoldersQuery
} = AliasApi
export default AliasApi
