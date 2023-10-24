import { Breadcrumb } from 'antd'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
const FormData = () => {
  const { pathname } = useLocation()
  console.log(pathname)
  return (
    <div>
      <div>
        <button
          type='submit'
          className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
        >
          Bộ Đề Thi Phòng PC
        </button>
      </div>
      <div className='flex items-center justify-start gap-10 '>
        <div
          className={` ${
            pathname === '/admin/details/dethi/easy' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide   font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/easy'>
            Danh Sách Câu Hỏi Dễ
          </Link>
        </div>
        <div
          className={`${
            pathname === '/admin/details/dethi/hard' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/hard'>
            Danh Sách Câu Hỏi Khó
          </Link>
        </div>
        <div
          className={` ${
            pathname === '/admin/details/dethi/normal' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/normal'>
            Danh Sách Câu Trung Bình
          </Link>
        </div>
        <div
          className={` ${
            pathname === '/admin/details' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white hover:bg-warning rounded-md float-right  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white ' to='/admin/de-kho'>
            Quay Lại
          </Link>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default FormData
