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
import categorydepartmentAPI from '~/apis/category/categories'
import { themeReducer } from '../slice/theme.slice'
import ExamSetting from '~/apis/examSetting/examSetting'
import loggersAPI from '~/apis/checklogs/loggersAPi'
import { loggersReducer } from '../slice/dateLogger.slice'
import UserDepartMentApi from '~/apis/userDepartMent/userDepartment'
import categoryHistoryAPI from '~/apis/question/ExamsEasy'
import topicExamsApi from '~/apis/topicQuestion/topicQuestion'
import { categoriesReducer } from '../slice/checkCategories'
import authReducer from '../slice/Auth.slice'
import AliasApi from '~/apis/aliasFolder/aliasFolder'
import { examsReducer } from '../slice/exams.slice'
import { updateStatusExamsReducer } from '../slice/errorExam'
import AnalyticsUser from '~/apis/analytics/analyticUser'
import AnalyticsAdmin from '~/apis/analytics/analyticsAdmin'
import { showDetailResultsReducer } from '../slice/detailsResultExam'
export const store = configureStore({
  reducer: {
    [RoleApi.reducerPath]: RoleApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [UserLoginApi.reducerPath]: UserLoginApi.reducer,
    [changeRoleApi.reducerPath]: changeRoleApi.reducer,
    [BannerApi.reducerPath]: BannerApi.reducer,
    [TaskRoleApi.reducerPath]: TaskRoleApi.reducer,
    [DepartmentAPI.reducerPath]: DepartmentAPI.reducer,
    [categorydepartmentAPI.reducerPath]: categorydepartmentAPI.reducer,
    [ExamSetting.reducerPath]: ExamSetting.reducer,
    [loggersAPI.reducerPath]: loggersAPI.reducer,
    [UserDepartMentApi.reducerPath]: UserDepartMentApi.reducer,
    [categoryHistoryAPI.reducerPath]: categoryHistoryAPI.reducer,
    [topicExamsApi.reducerPath]: topicExamsApi.reducer,
    [AliasApi.reducerPath]: AliasApi.reducer,
    [AnalyticsUser.reducerPath]: AnalyticsUser.reducer,
    [AnalyticsAdmin.reducerPath]: AnalyticsAdmin.reducer,
    //toolkit
    theme: themeReducer,
    checkToken: authReducer,
    loggers: loggersReducer,
    dataCategories: categoriesReducer,
    examAction: examsReducer,
    updateStatusExam: updateStatusExamsReducer,
    showDetailsExam : showDetailResultsReducer
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
      categorydepartmentAPI.middleware,
      ExamSetting.middleware,
      loggersAPI.middleware,
      UserDepartMentApi.middleware,
      categoryHistoryAPI.middleware,
      AliasApi.middleware,
      topicExamsApi.middleware,
      AnalyticsAdmin.middleware,
      AnalyticsUser.middleware,
      rtkQueryErrorLogger
    )
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
