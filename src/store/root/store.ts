import { configureStore } from '@reduxjs/toolkit'
import { rtkQueryErrorLogger } from '../middlewares/middlewares'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import RoleApi from '~/apis/roles/roles.api'
import UserApi from '~/apis/user/user.api'
import UserLoginApi from '~/apis/auth/signin.api'
import changeRoleApi from '~/apis/roles/changeRoleUser'
import BannerApi from '~/apis/banner/banner.api'
import TaskRoleApi from '~/apis/task/task.api'
import DepartmentAPI from '~/apis/department/department'
export const store = configureStore({
  reducer: {
    [RoleApi.reducerPath]: RoleApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [UserLoginApi.reducerPath]: UserLoginApi.reducer,
    [changeRoleApi.reducerPath]: changeRoleApi.reducer,
    [BannerApi.reducerPath]: BannerApi.reducer,
    [TaskRoleApi.reducerPath]: TaskRoleApi.reducer,
    [DepartmentAPI.reducerPath]: DepartmentAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      RoleApi.middleware,
      UserApi.middleware,
      UserLoginApi.middleware,
      changeRoleApi.middleware,
      BannerApi.middleware,
      TaskRoleApi.middleware,
      DepartmentAPI.middleware,
      rtkQueryErrorLogger
    )
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
