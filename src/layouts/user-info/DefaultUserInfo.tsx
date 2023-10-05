import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Header, Sidebar } from '../DefaultLayout/components'
import { Outlet } from 'react-router-dom'
const DefaultUserInfo = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div>
      <Helmet>
        <title> Trang Cá Nhân </title>
        <meta name='Trang Cá Nhân ' />
      </Helmet>
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} textUi='Trang Cá Nhân'/>
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
export default DefaultUserInfo
