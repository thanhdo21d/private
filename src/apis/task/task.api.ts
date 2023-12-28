import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'
import { ItaskRole, ItaskRoleDocs } from '~/types/task/task.type'
const TaskRoleApi = createApi({
  reducerPath: 'taskRole',
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
  tagTypes: ['taskRole'],
  endpoints: (builder) => ({
    removeTaskRole: builder.mutation<void, { id: string; body: string[] }>({
      query: ({ id, body }) => {
        return {
          url: `/role/remove/${id}`,
          method: 'PUT',
          body: { idTask: body }
        }
      },
      invalidatesTags: ['taskRole']
    }),
    addTaskRole: builder.mutation<void, { id: string; body: string[] }>({
      query: ({ id, body }) => {
        console.log(id, body, 'ok body')
        return {
          url: `/ro/${id}`,
          method: 'PUT',
          body: { idTask: body }
        }
      },
      invalidatesTags: ['taskRole']
    }),
    getAllTaskRole: builder.query<ItaskRoleDocs, void>({
      query: () => {
        return {
          url: `/task/role/all`,
          method: 'GET'
        }
      },
      providesTags: ['taskRole']
    })
  })
})
export const { useRemoveTaskRoleMutation, useGetAllTaskRoleQuery, useAddTaskRoleMutation } = TaskRoleApi
export default TaskRoleApi
