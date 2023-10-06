import { Navigate, createBrowserRouter } from 'react-router-dom'
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
export const routers = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
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
    children: [
      {
        element: <DefaultLayout />,
        children: [
          { index: true, element: <Navigate to='dashboard' /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'roles', element: <Roles /> },
          { path: 'roles/:id/edit', element: <EditRoles /> },
          { path: 'all-member', element: <AllMember /> },
          { path: 'all-member/add', element: <AddMember /> },
          { path: 'roles/add', element: <EditRoles /> }

        ]
      }
    ]
  }
])