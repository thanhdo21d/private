//http://localhost:8282/department/queryAllimport { IRole, IRoleDoc, IRoleDocs } from '~/types/roles/roles.type'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDepartmentTypeDocs } from '~/types/department/department.type'
const DepartmentAPI = createApi({
  reducerPath: 'Department',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getAllDepartment: builder.query<IDepartmentTypeDocs[], void>({
      query: () => {
        return {
          url: '/department/queryAll',
          method: 'GET'
        }
      },
      providesTags: ['Department']
    }),
    getIdDepartment: builder.query<any, string>({
      query: (id: string) => `/department/query/${id}`,
      providesTags: ['Department']
    })
  })
})
export const { useGetAllDepartmentQuery, useGetIdDepartmentQuery } = DepartmentAPI
export default DepartmentAPI
