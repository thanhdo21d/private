//http://localhost:8282/
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { categories } from '~/types/department/department.type'
const categorydepartmentAPI = createApi({
  reducerPath: 'Category',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<any[], void>({
      query: () => {
        return {
          url: '/query-all/categoryDepartments',
          method: 'GET'
        }
      },
      providesTags: ['Category']
    }),
    createCategories: builder.mutation<any[], any>({
      query: (data) => {
        return {
          url: '/Categorydepartment/create',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['Category']
    })
  })
})
export const { useGetAllCategoriesQuery, useCreateCategoriesMutation } = categorydepartmentAPI
export default categorydepartmentAPI
