import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { CgProfile } from 'react-icons/cg'
import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { UserOutlined, BarChartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { FaUserEdit, FaUserFriends, FaClipboardList, FaRegNewspaper, FaImages } from 'react-icons/fa'
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
  ])
  // SettingOutlined
]
export const settingsSystem: MenuProps['items'] = [
  getItem('Người dùng', 'uses', <UserOutlined />, [
    getItem(<NavLink to={`/tree-menu/settings`}>Nhân viên</NavLink>, 'staffs', <FaUserEdit />)
  ]),
  getItem(<NavLink to={`/tree-menu/settings`}>Cài đặt</NavLink>, 'settings', <SettingOutlined />)
]
