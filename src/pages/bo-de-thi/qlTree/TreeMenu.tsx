import axios from 'axios'
import React, { memo, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet, createSearchParams, useNavigate } from 'react-router-dom'
import { Header, Sidebar } from '~/layouts/DefaultLayout/components'
import SidebarTree from './Silbader'
const TreeMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <Helmet>
        <title> Trang Quản Trị </title>
        <meta name='description' />
      </Helmet>
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SidebarTree sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} textUi='Trang Quản Trị' />
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className='mx-auto  p-4 md:p-6 2xl:p-10'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default memo(TreeMenu)
