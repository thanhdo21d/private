/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon } from '~/components'
import { Menu, Tooltip } from 'antd'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { itemsUser } from '../DefaultLayout/components/Sidebar/components'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
const SilbarUser = ({ sidebarOpen, setSidebarOpen, textUi, checkInfo }: SidebarProps) => {
  const trigger = useRef<any>(null)
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
          className=''
        >
          <BarsIcon />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='px-3 mt-5'>
          <div className='select-none'>
            <h3 className='text-bodydark2 mb-4 ml-4 text-sm font-semibold select-none'>MENU</h3>
            <Menu theme='dark' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' items={itemsUser} />
          </div>
        </nav>
      </div>
    </aside>
  )
}
export default SilbarUser
