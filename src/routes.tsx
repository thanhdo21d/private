import { Navigate, Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'
import { Suspense, lazy, useContext, useEffect } from 'react'
import { Dashboard } from './pages'
const NotFound = lazy(() => import('./pages').then((module) => ({ default: module.NotFound })))
import DefaultLayout from './layouts/DefaultLayout'
import Roles from './pages/roles/Roles'
import AllMember from './pages/member/all member/AllMember'
import AddMember from './pages/member/admin/Admin.member'
import DefaultLayoutTrangthi from './layouts/trangThi/defaultLayoutTrangthi'
const Signin = lazy(() => import('./pages/login/signin/Signin'))
import DefaultUserInfo from './layouts/user-info/DefaultUserInfo'
const UserProfile = lazy(() => import('./pages/user-profile/UserProfile'))
import InfoResult from './pages/ket-qua-thi/InfoResult'
import Achievements from './pages/thanh-tich/Achievements'
import DetailsResult from './pages/ket-qua-thi/details/DetailsResult'
import PopQuesion from './layouts/trangThi/components/Popup-thi/PopQuesion'
import EditRoles from './pages/roles/EditRoles'
import MemberInRole from './pages/roles/MemberInRole'
import EditMember from './pages/member/edit member/EditMember'
import Cookies from 'js-cookie'
import DsDethi from './pages/bo-de-thi/level_easy/DsDethi'
import { AppContext } from './contexts/app.contexts'
import AcceptUserDipament from './pages/accept-phong-ban/AcceptUserDipament'
import AddBanner from './pages/banner/AddBanner'
import EditBanner from './pages/banner/EditBanner'
import DsDeThiEszy from './pages/bo-de-thi/level_hard/DsDeThiHard'
import DsDeThiTB from './pages/bo-de-thi/level_normal/DsDeThiTB'
import DetailsDsEasy from './pages/bo-de-thi/level_easy/DetailsDsEasy'
import FormData from './pages/bo-de-thi/dataDetails/FormData'
import EditExams from './pages/bo-de-thi/editExams/EditExams'
import DetailsExams from './pages/bo-de-thi/dataDetails/DetailsExams'
import DemoExcel from './layouts/trangThi/components/Popup-thi/DemoExcel'
import MenuIten from './utils/Demol'
import ChoosExam from './pages/accept-phong-ban/ChoosExam'
import Setting from './pages/setting/Setting'
import TreeMenu from './pages/bo-de-thi/qlTree/TreeMenu'
import EditTree from './pages/bo-de-thi/qlTree/EditTree'
import ExamConfiguration from './pages/bo-de-thi/qlTree/ExamConfiguration'
import ExamsQuestion from './pages/bo-de-thi/detailExamsQuestion/ExamsQuestion'
import CheckLog from './pages/check-log/CheckLog'
import DashBoardOtherAdmin from './layouts/otherAdmin/DashBoardOtherAdmin'
import CreateExams from './pages/bo-de-thi/qlTree/CreateExams'
import DetailsExamsQuestion from './pages/bo-de-thi/detailExamsQuestion/DetailsExamsQuestion'
import MemberDepartment from './layouts/otherAdmin/MemberDepartment'
import EditQuestionExams from './pages/bo-de-thi/dataDetails/EditQuestionExams'
import FoldersCategories from './pages/bo-de-thi/qlTree/FoldersCategories'
import Home from './pages/home/Home'
import GuideLine from './pages/GuideLine/GuideLine'
import ChooseExams from './pages/accept-phong-ban/ChooseExams'
const CheckCookieUserLogin = () => {
  const cookie = Cookies.get('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (!cookie) {
      navigate('/login')
    }
  }, [cookie, navigate])
  return cookie ? <Outlet /> : <Navigate to='/login' />
}
export const PrivateRoute = () => {
  const cookie = Cookies.get('token')
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (profile?.role.name === '') {
      navigate('/login')
    }
  }, [profile, navigate])
  return profile?.role.name === '' && cookie != 'undefined' ? <Outlet /> : <Navigate to='/login' />
}
export const routers = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: '/tree-menu/:id',
    element: <CheckCookieUserLogin />,
    children: [
      {
        element: <TreeMenu />,
        children: [
          { path: 'all-folders', element: <FoldersCategories /> },
          { path: 'dashboard-other-admin', element: <DashBoardOtherAdmin /> },
          { path: 'member', element: <MemberDepartment /> },
          { path: 'settings/edit', element: <EditTree /> },
          { path: 'all-folders/category/:id', element: <FormData /> },
          { path: 'settings/ki-thi', element: <ExamConfiguration /> },
          { path: 'settings/ki-thi/bai-thi/:id', element: <ExamsQuestion /> },
          { path: 'settings/ki-thi/bai-thi/:id/:id/details-exams', element: <DetailsExamsQuestion /> },
          { path: 'settings/ki-thi/bai-thi/:id/create-exams', element: <CreateExams /> }
        ]
      }
    ]
  },
  { path: 'details-exams/:id', element: <DetailsExams /> },
  { path: '/GuideLine', element: <GuideLine /> },
  { path: 'question/edit/:id', element: <EditQuestionExams /> },
  { path: 'action/home', element: <Home /> },
  {
    path: '/',
    element: <CheckCookieUserLogin />,
    children: [
      {
        element: <DefaultLayoutTrangthi />,
        children: [
          { index: true, element: <Navigate to='action/home' /> },
          { path: 'home', element: <AcceptUserDipament /> },
          { path: 'choose-exam/:id', element: <ChooseExams /> },
          { path: 'excel', element: <DemoExcel /> },
          { path: 'action-bai-thi/:id', element: <PopQuesion /> },
          { path: 'ChoosExam/:id', element: <ChoosExam /> }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: (
      <Suspense>
        <Signin />
      </Suspense>
    )
  },
  {
    path: '/user-info',
    element: <CheckCookieUserLogin />,
    children: [
      {
        element: <DefaultUserInfo />,
        children: [
          { index: true, element: <Navigate to='profile' /> },
          {
            path: 'profile',
            element: (
              <Suspense>
                <UserProfile />
              </Suspense>
            )
          },
          { path: 'ket-qua-thi', element: <InfoResult /> },
          { path: 'ket-qua-thi/:id', element: <DetailsResult /> },
          { path: 'thanh-tich', element: <Achievements /> }
        ]
      }
    ]
  },
  {
    path: '/admin',
    // element: <CheckCookieUserLogin />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'roles', element: <Roles /> },
          { path: 'roles/edit/:id', element: <EditRoles /> },
          { path: 'de-kho', element: <DsDethi /> },
          { path: 'details/dethi/:id', element: <FormData /> },
          { path: 'details/dethi/edit/:id', element: <EditExams /> },
          { path: 'level_easy/details/:id', element: <DetailsDsEasy /> },
          { path: 'de-trung-binh', element: <DsDeThiTB /> },
          { path: 'de-de', element: <DsDeThiEszy /> },
          { path: 'member/:id/edit', element: <EditMember /> },
          { path: 'all-member', element: <AllMember /> },
          { path: 'all-member/add', element: <AddMember /> },
          { path: 'roles/:id/memRole', element: <MemberInRole /> },
          { path: 'roles/add', element: <EditRoles /> },
          { path: 'banner', element: <AddBanner /> },
          { path: 'banner/:id/edit', element: <EditBanner /> },
          { path: 'setting', element: <Setting /> },
          { path: 'check-log', element: <CheckLog /> }
        ]
      }
    ]
  }
])
