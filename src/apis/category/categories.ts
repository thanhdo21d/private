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
    }),
    getIDcategories: builder.query<any[], any>({
      query: ({ id, page, limit }) => {
        return {
          url: `/query-id/category/${id}`,
          method: 'GET',
          params: {
            page: page,
            limit: limit
          }
        }
      },
      providesTags: ['Category']
    }),
    removeExamsDepartment: builder.mutation<any, any>({
      query: ({ id, body }: any) => {
        return {
          url: `/department/removeExams/${id}`,
          method: 'DELETE',
          body: { idExams: body }
        }
      },
      invalidatesTags: ['Category']
    })
  })
})
export const {
  useGetAllCategoriesQuery,
  useCreateCategoriesMutation,
  useGetIDcategoriesQuery,
  useRemoveExamsDepartmentMutation
} = categorydepartmentAPI
export default categorydepartmentAPI
