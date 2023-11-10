/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon, Button } from '~/components'
import { Menu, Skeleton, Tooltip } from 'antd'
import { Link, NavLink, createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom'
import { AiFillHome, AiFillSetting, AiOutlineDashboard } from 'react-icons/ai'
import { AppContext } from '~/contexts/app.contexts'
import axios from 'axios'
import { dashboardOther, settingsSystem } from '~/layouts/DefaultLayout/components/Sidebar/components'
import { useGetCategoriesDepartmentsQuery } from '~/apis/category/categories'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
// ...

export function CategoryTreeItem({ category, level, bg }: any) {
  const location = useLocation()
  const navigate = useNavigate()
  // Khởi tạo state isOpen dựa vào sessionStorage
  const [isOpen, setIsOpen] = useState(() => {
    const openCategories = JSON.parse(sessionStorage.getItem('openCategories') || '{}')
    return !!openCategories[category._id]
  })

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    {
      bg
        ? navigate({
            search: createSearchParams({
              category: category?._id
            }).toString()
          })
        : navigate({
            pathname: `category/${category._id}`,
            search: createSearchParams({
              category: category?._id
            }).toString()
          })
    }
  }

  const toggleOpen = () => {
    setIsOpen((prevState) => {
      const newState = !prevState
      const openCategories = JSON.parse(sessionStorage.getItem('openCategories') || '{}')
      if (newState) {
        openCategories[category._id] = true
      } else {
        delete openCategories[category._id]
      }
      sessionStorage.setItem('openCategories', JSON.stringify(openCategories))
      return newState
    })
  }

  // Xác định xem mục danh mục hiện tại có phải là mục đang được chọn không
  const isActive = location.pathname.includes(`category/${category._id}`)

  // Style cho mục đang được chọn
  const activeStyle = {
    fontWeight: 'bold',
    color: '#4CAF50' // Màu xanh
  }

  return (
    <div>
      <div className={`${bg ? 'bg-white' : 'bg-[#000c17]'}`}>
        <div onClick={toggleOpen} className='cursor-pointer px-3 py-2'>
          <div className='category-item relative flex justify-between gap-5'>
            <div>
              {category.children && category.children.length > 0 ? (
                <span className='mr-3'>{isOpen ? '-' : '+'}</span>
              ) : null}
              <span
                className={`category-name hover:text-md ${
                  bg ? 'hover:text-black' : 'hover:text-white'
                } hover:font-semibold`}
                onClick={handleCategoryClick}
                style={isActive ? activeStyle : {}}
              >
                {category.name}
              </span>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className={`ml-5 space-y-1 transition-all opacity-100 max-h-96`}>
            {category.children &&
              category.children.map((child: any) => (
                <CategoryTreeItem key={child._id} category={child} level={level + 1} bg={bg} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ...

const SidebarTree = ({ sidebarOpen, setSidebarOpen, textUi }: SidebarProps) => {
  const [categories, setCategories] = useState<any[]>([])
  const navigate = useNavigate()
  const trigger = useRef<any>(null)
  const { id } = useParams()
  const uri = import.meta.env.VITE_API
  const sidebar = useRef<any>(null)
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, _] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
  const { data: dataCategoriTree, isLoading, isFetching } = useGetCategoriesDepartmentsQuery(id)
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [])
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])
  // Trong SidebarTree component

  useEffect(() => {
    // Kiểm tra trước khi thực hiện API call
    const savedCategories = sessionStorage.getItem('categories')
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      axios
        .get(`${uri}category-tree/${id}`)
        .then((response) => {
          setCategories([response.data])
          // Lưu kết quả vào sessionStorage
          sessionStorage.setItem('categories', JSON.stringify([response.data]))
        })
        .catch((error) => {
          console.error('Error fetching categories', error)
        })
    }
  }, [id, uri]) // Bạn nên thêm `id` và `uri` vào dependencies array

  // ...phần còn lại của component

  return (
    <div
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#001529] duration-300 ease-linear dark:bg-[#001529] lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='lg:py-6 flex items-center justify-between gap-2 px-3 py-5'>
        <p style={{ color: 'red' }} className='pl-5 font-medium  text-xl font-mono'>
          {textUi}
        </p>
        <span className='z-10'>
          <Tooltip placement='right' title={'Quay Lại Trang Home !'}>
            <NavLink to='/'>
              <AiFillHome className='text-[30px]' />
            </NavLink>
          </Tooltip>
        </span>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='lg:hidden block'
        >
          <BarsIcon />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      {isLoading || isFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={dashboardOther}
          />
          {/* <!-- Sidebar Menu --> */}
          <nav className='px-3 mt-5'>
            <div className='select-none'>
              <h3 className='text-bodydark2 mb-4 ml-4 text-sm font-semibold select-none'>categories</h3>
              {categories.map((category: any) => (
                <CategoryTreeItem key={category._id} category={category} level={0} />
              ))}
            </div>
          </nav>
        </div>
      )}
      <p
        className='flex items-center gap-3 mt-3 start pl-[26px] cursor-pointer hover:bg-body py-2 rounded-md'
        onClick={() => navigate(`settings`)}
      >
        <span>
          <AiFillSetting />
        </span>
        <span className='text-md text-bodydark1 font-medium'>Cài Đặt</span>
      </p>
    </div>
  )
}
export default SidebarTree
