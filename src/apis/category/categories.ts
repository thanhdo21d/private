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
    getAllCategoriesDepartment: builder.query<any[], any>({
      query: ({ page, limit, name }: { page: string; limit: string; name: string }) => {
        return {
          url: '/get-category/users',
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            name: name || ''
          }
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
      query: ({ id, page, limit, search }) => {
        return {
          url: `/query-id/category/${id}`,
          method: 'GET',
          params: {
            page: page,
            limit: limit,
            search: search || ''
          }
        }
      },
      providesTags: ['Category']
    }),
    removeExamsDepartment: builder.mutation<any, any>({
      query: ({ id, body }: any) => {
        console.log(body, 'db day')
        return {
          url: `/department/removeExams/${id}`,
          method: 'DELETE',
          body: { idExams: body }
        }
      },
      invalidatesTags: ['Category']
    }),
    getCategoriesDepartments: builder.query({
      query: ({ id, name }: { id: string; name: string }) => {
        return {
          url: `category-tree/${id}`,
          method: 'GET',
          params: {
            name: name || ''
          }
        }
      },
      providesTags: ['Category']
    }),
    removeCategoriesTree: builder.mutation({
      query: (id) => {
        return {
          url: `/remove/category/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['Category']
    }),
    editCategoriesTree: builder.mutation({
      query: ({ id, parentId, name }: { id: string; parentId: string | null; name: string }) => {
        return {
          url: `/edit/category/${id}`,
          method: 'PUT',
          body: {
            name: name,
            parentId: parentId
          }
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
  useRemoveExamsDepartmentMutation,
  useGetCategoriesDepartmentsQuery,
  useRemoveCategoriesTreeMutation,
  useEditCategoriesTreeMutation,
  useGetAllCategoriesDepartmentQuery
} = categorydepartmentAPI
export default categorydepartmentAPI
