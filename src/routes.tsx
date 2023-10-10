import { Navigate, Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'
import { Dashboard, NotFound } from './pages'
import DefaultLayout from './layouts/DefaultLayout'
import Roles from './pages/roles/Roles'
import AllMember from './pages/member/all member/AllMember'
import AdminMember from './pages/member/admin/Admin.member'
import AddMember from './pages/member/admin/Admin.member'
import DefaultLayoutTrangthi from './layouts/trangThi/defaultLayoutTrangthi'
import Signin from './pages/login/signin/Signin'
import DefaultUserInfo from './layouts/user-info/DefaultUserInfo'
import UserProfile from './pages/user-profile/UserProfile'
import InfoResult from './pages/ket-qua-thi/InfoResult'
import Achievements from './pages/thanh-tich/Achievements'
import DetailsResult from './pages/ket-qua-thi/details/DetailsResult'
import HelloUser from './layouts/trangThi/components/default/HelloUser'
import PopQuesion from './layouts/trangThi/components/Popup-thi/PopQuesion'
import EditRoles from './pages/roles/EditRoles'
import { useEffect, useState } from 'react'
import { useAppSelector } from './store/root/hook'
import { RootState } from '@reduxjs/toolkit/query'
import { getCookie } from './utils/utils'
import MemberInRole from './pages/roles/MemberInRole'
import EditMember from './pages/member/edit member/EditMember'
const CheckCookieUserLogin = () => {
  const accessToken = useAppSelector((state: any) => console.log(state.accessToken))
  console.log(accessToken)
  const [checkLogin, setChecklogin] = useState<boolean>(true)
  const navigate = useNavigate()
  const isAuth = true
  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}
const PrivateRoute = () => {
  const navigate = useNavigate()
  const isAuth = true
  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])
  return isAuth ? <Outlet /> : <Navigate to='/login' />
}
export const routers = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
    element: <CheckCookieUserLogin />,
    children: [
      {
        element: <DefaultLayoutTrangthi />,
        children: [
          { index: true, element: <Navigate to='home' /> },
          { path: 'home', element: <HelloUser /> },
          { path: 'action-bai-thi', element: <PopQuesion /> }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Signin />
  },
  {
    path: '/user-info',
    element: <CheckCookieUserLogin />,
    children: [
      {
        element: <DefaultUserInfo />,
        children: [
          { index: true, element: <Navigate to='profile' /> },
          { path: 'profile', element: <UserProfile /> },
          { path: 'ket-qua-thi', element: <InfoResult /> },
          { path: 'ket-qua-thi/:id', element: <DetailsResult /> },
          { path: 'thanh-tich', element: <Achievements /> }
        ]
      }
    ]
  },
  {
    path: '/admin',
    element: <PrivateRoute />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'roles', element: <Roles /> },
          { path: 'roles/:id/edit', element: <EditRoles /> },
          { path: 'member/:id/edit', element: <EditMember /> },
          { path: 'all-member', element: <AllMember /> },
          { path: 'all-member/add', element: <AddMember /> },
          { path: 'roles/:id/memRole', element: <MemberInRole /> },
          { path: 'roles/add', element: <EditRoles /> }
        ]
      }
    ]
  }
])
