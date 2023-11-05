/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon } from '~/components'
import { Menu, Tooltip } from 'antd'
import { Link, NavLink, createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { AppContext } from '~/contexts/app.contexts'
import axios from 'axios'
import { settingsSystem } from '~/layouts/DefaultLayout/components/Sidebar/components'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
function CategoryTreeItem({ category, level }: any) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState)
  }
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/tree-menu/category/${category._id}`)
    // {
    //   search: createSearchParams({
    //     category: category?._id
    //   }).toString()
    // }
  }

  return (
    <div className='bg-[#000c17]'>
      <div onClick={toggleOpen} className='cursor-pointer  px-3 py-2'>
        <div className='category-item relative'>
          {category.children && category.children.length > 0 ? (
            <span className='mr-3'>{isOpen ? '-' : '+'}</span>
          ) : null}
          <span
            className='category-name  hover:text-md hover:text-white hover:font-semibold'
            onClick={handleCategoryClick}
          >
            {category.name}
          </span>
        </div>
      </div>
      <div className={`ml-5 space-y-1 transition-all ${isOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'}`}>
        {category.children &&
          category.children.length > 0 &&
          category.children.map((child: any) => (
            <CategoryTreeItem key={child._id} category={child} level={level + 1} />
          ))}
      </div>
    </div>
  )
}
const SidebarTree = ({ sidebarOpen, setSidebarOpen, textUi, checkInfo }: SidebarProps) => {
  const { pathname } = useLocation()
  const [categories, setCategories] = useState<any[]>([])
  const navigate = useNavigate()
  const [dataTask, setDataTask] = useState<any[]>([])
  const trigger = useRef<any>(null)
  const [checkMenu, setCheckMenu] = useState<boolean>(false)
  const sidebar = useRef<any>(null)
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, _] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
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
  useEffect(() => {
    axios
      .get('http://localhost:8080/category-tree/6543aef2e61d2cdb6d249277')
      .then((response: any) => {
        setCategories([response.data])
      })
      .catch((error) => {
        console.error('Error fetching categories', error)
      })
  }, [])
  return (
    <aside
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
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
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
      <Menu theme='dark' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' items={settingsSystem} />
    </aside>
  )
}
export default SidebarTree
