import { configureStore } from '@reduxjs/toolkit'
import { rtkQueryErrorLogger } from '../middlewares/middlewares'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import RoleApi from '~/apis/roles/roles.api'
import UserApi from '~/apis/user/user.api'
import UserLoginApi from '~/apis/auth/signin.api'
export const store = configureStore({
  reducer: {
    [RoleApi.reducerPath]: RoleApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [UserLoginApi.reducerPath]: UserLoginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RoleApi.middleware, UserApi.middleware, UserLoginApi.middleware, rtkQueryErrorLogger)
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
