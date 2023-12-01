import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { CgProfile } from 'react-icons/cg'
import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { UserOutlined, BarChartOutlined, ShoppingOutlined, BugOutlined } from '@ant-design/icons'
import { FaUserEdit, FaUserFriends, FaClipboardList, FaRegNewspaper, FaImages } from 'react-icons/fa'
import { AiOutlineDashboard } from 'react-icons/ai'
type MenuItem = Required<MenuProps>['items'][number]
export function getItem(
  label?: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
export const items: MenuProps['items'] = [
  getItem(<NavLink to={`/admin`}>Dasbboard</NavLink>, 'dashboard', <AppstoreOutlined />),
  getItem('Bộ Đề Thi', 'products', <AppstoreOutlined />, [
    getItem(<NavLink to={`/admin/de-kho`}>Cấp Độ Khó</NavLink>, 'kho'),
    getItem(<NavLink to={`/admin/de-trung-binh`}>Cấp Độ Trung Bình</NavLink>, 'Cấp Độ Trung Bình'),
    getItem(<NavLink to={`/admin/de-de`}>Cấp Độ Dễ</NavLink>, 'Cấp Độ Dễ')
  ]),
  getItem('Người dùng', 'users', <AppstoreOutlined />, [
    getItem(<NavLink to={`/admin/all-member`}>Thành Viên</NavLink>, 'Thành Viên'),
    getItem(<NavLink to={`/admin/all-member/add`}>Thêm Thành Viên</NavLink>, 'admin')
  ]),
  // SettingOutlined
  getItem(<p>Vai Trò</p>, 'Vai Trò', <AppstoreOutlined />, [
    getItem(<NavLink to={`/admin/roles`}>Vai Trò</NavLink>, 'b')
  ]),
  getItem(<NavLink to={`/admin/banner`}>banner</NavLink>, 'banner', <AppstoreOutlined />)
]
export const itemsUser: MenuProps['items'] = [
  getItem('Thông Tin Cá Nhân', 'profilese', <CgProfile />, [
    getItem(<NavLink to={`/user-info/profile`}>profile</NavLink>, 'pl')
  ]),
  getItem('Kết Quả Bài Thi', 'products', <AppstoreOutlined />, [
    getItem(<NavLink to={`/user-info/ket-qua-thi`}>Kết Quả</NavLink>, 'kq')
  ]),
  getItem('Xếp Hạng Bản Thân', 'users', <AppstoreOutlined />, [
    getItem(<NavLink to={`/user-info/thanh-tich`}>Thành Tích</NavLink>, 'Thành Tích')
  ]),
  // SettingOutlined
]
export const settingsSystem: MenuProps['items'] = [
  getItem('Người dùng', 'uses', <UserOutlined />, [
    getItem(<NavLink to={`/tree-menu/1/settings`}>Nhân viên</NavLink>, 'staffs', <FaUserEdit />)
  ])
]
export const settingsSystemLogs: MenuProps['items'] = [
  getItem('Cài Đặt', 'settings', <SettingOutlined />, [
    getItem(<NavLink to={`/admin/check-log`}>Logs Hệ Thống</NavLink>, 'log', <BugOutlined />)
  ])
]
export const settingsAlias: MenuProps['items'] = [
  getItem( <p className='text-white font-semibold'>Cài Đặt</p>, 'settins', <SettingOutlined />, [
    getItem(<NavLink to={`alias-folder`}>Cấu Hình Alias</NavLink>, 'alias')
  ])
]
export const dashboardOther: MenuProps['items'] = [
  getItem('dashboard', 'Other', <AiOutlineDashboard />, [
    getItem(<NavLink to={`dashboard-other-admin`}>dashboard</NavLink>, 'Others', <BugOutlined />),
    getItem(<NavLink to={`member`}>Thành Viên</NavLink>, 'member-other', <UserOutlined />)
  ])
]
