/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon } from '~/components'
import { Menu, Tooltip } from 'antd'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { items, itemsUser, settingsSystem } from './components'
import { AiFillHome } from 'react-icons/ai'
import { AppContext } from '~/contexts/app.contexts'
import { useGetAllRolesQuery } from '~/apis/roles/roles.api'
import { FcInfo } from 'react-icons/fc'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
const Sidebar = ({ sidebarOpen, setSidebarOpen, textUi, checkInfo }: SidebarProps) => {
  const { pathname } = useLocation()
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
  const { profile } = useContext(AppContext)
  useEffect(() => {
    fetch(`http://localhost:8282/users/${profile?._id}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        setDataTask(data)
        // const demo = data.user.role.tasks.some(
        //   ({ _id, task, path, role }: { _id: string; task: string; path: string; role: string }) => {
        //     const lastSlashIndex = pathname.lastIndexOf('/')
        //     if (pathname.includes('edit')) {
        //       const modifiedUrl = pathname.substring(0, lastSlashIndex)
        //     } else {

        //     }
        //     path.includes(pathname)
        //   }
        // )
        if (checkMenu == false) {
          // navigate('*')
        }
      })
  }, [pathname])
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
            <h3 className='text-bodydark2 mb-4 ml-4 text-sm font-semibold select-none'>MENU</h3>
            {checkInfo ? (
              <Menu
                theme='dark'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode='inline'
                items={itemsUser}
              />
            ) : (
              <div className='grid grid-rows-1 items-center 	gap-y-5'>
                {dataTask &&
                  dataTask?.user?.role?.tasks
                    ?.filter((taskDb: any) => !taskDb.task.includes('sửa') && !taskDb.task.includes('Thêm'))
                    .map(({ path, task, _id }: { path: string; task: string; _id: string }) => {
                      return (
                        <div key={_id}>
                          <div
                            className={`hover:bg-strokedark rounded-md flex h-[35px] ${
                              pathname === path ? 'bg-danger' : ''
                            }`}
                          >
                            <Link className='flex ml-5 gap-3 items-center' to={`${task === 'home' ? '/' : path}`}>
                              <span className='animate-spin'>
                                <FcInfo className='text-2xl' />
                              </span>
                              <span
                                className={`font-satoshi text-bodydark2 ${
                                  pathname === path ? 'text-white font-bold' : ''
                                } `}
                              >
                                {task}
                              </span>
                            </Link>{' '}
                          </div>
                        </div>
                      )
                    })}
                <Menu
                  theme='dark'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode='inline'
                  items={settingsSystem}
                />
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  )
}
export default Sidebar
