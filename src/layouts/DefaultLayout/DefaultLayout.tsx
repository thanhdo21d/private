import { Header, Sidebar } from './components'

import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <Helmet>
        <title> Trang Quản Trị </title>
        <meta name='description' />
      </Helmet>
      <div className='flex h-screen overflow-hidden'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} textUi='Trang Quản Trị' />
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

export default DefaultLayout
