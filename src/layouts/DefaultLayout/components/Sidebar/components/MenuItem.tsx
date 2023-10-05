import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { CgProfile } from 'react-icons/cg'
import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
type MenuItem = Required<MenuProps>['items'][number]
function getItem(
  label: React.ReactNode,
  key: React.Key,
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
    getItem(<NavLink to={`/manager/products`}>Cấp Độ Khó</NavLink>, 'product'),
    getItem(<NavLink to={`/manager/toppings`}>Cấp Độ Trung Bình</NavLink>, 'Cấp Độ Trung Bình'),
    getItem(<NavLink to={`/manager/toppings`}>Cấp Độ Dễ</NavLink>, 'Cấp Độ Trung Bình')
  ]),
  getItem('Người dùng', 'users', <AppstoreOutlined />, [
    getItem(<NavLink to={`/admin/all-member`}>Thành Viên</NavLink>, 'Thành Viên'),
    getItem(<NavLink to={`/admin/all-member/add`}>Thêm Thành Viên</NavLink>, 'admin')
  ]),
  // SettingOutlined
  getItem(<NavLink to={`/`}>Vai Trò</NavLink>, 'Vai Trò', <AppstoreOutlined />, [
    getItem(<NavLink to={`/admin`}>Thêm Vai Trò</NavLink>, 'a'),
    getItem(<NavLink to={`/admin/roles`}>Vai Trò</NavLink>, 'b')
  ])
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
