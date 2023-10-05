import { Empty, Popconfirm } from 'antd'
import React from 'react'
import logoUrl from '../../assets/images/logo/bg-thi.jpg'
import { AiOutlineLogin } from 'react-icons/ai'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import { Helmet } from 'react-helmet-async'
import { RxAvatar } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { Button } from '~/components'
import { PiKeyReturnFill } from 'react-icons/pi'
const DefaultLayoutTrangthi = () => {
  const navigate = useNavigate()
  const handelLogOut = () => {
    const logout = window.confirm('Bạn Có Muốn Đăng Xuất !')
    if (logout) {
      navigate('/login')
    }
  }
  const Completionist = () => <span>You are good to go!</span>
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }
  const confirm = () => {
    navigate('/user-info')
  }
  const cancel = () => {
    return
  }
  return (
    <section className='min-h-screen  flex items-stretch text-white'>
      <Helmet>
        <title> Đề Thi Khảo Sát Denso </title>
        <meta name='description' />
      </Helmet>
      <div
        className='lg:flex w-full z-0 hidden bg-login bg-no-repeat bg-cover relative items-center'
        style={{
          backgroundImage: `url(${logoUrl})`
        }}
      ></div>
      <div className='right-0 top-10  absolute w-[350px] items-center text-center bg-bodydark2 rounded-lg h-[80px]'>
        <div className='pt-4 float-right pr-5 ' onClick={handelLogOut}>
          <Tooltip placement='leftTop' title={'Đăng Xuất !'}>
            <AiOutlineLogin className='text-[40px] hover:bg-meta-1' />
          </Tooltip>
        </div>
        <div className='pt-5 float-right pr-2 '>
          <p className='text-md font-medium pr-2'>
            Xin Chào <span className='text-danger font-bold text-xl'>Vũ Thành Đô</span>{' '}
          </p>
        </div>
        <div className='pt-4 float-left pl-2 '>
          <p className='text-md font-medium pr-2'>
            <Tooltip placement='leftTop' title={'Trang Cá Nhân !'}>
              <Popconfirm
                title='Chuyển Qua Trang Cá Nhân !'
                description='Bạn Có Muốn Chuyển Qua Trang Cá Nhân?'
                onConfirm={confirm}
                onCancel={cancel}
                okButtonProps={{
                  style: { backgroundColor: 'blue' }
                }}
                okText='Yes'
                cancelText='No'
              >
                <RxAvatar className='text-[40px] hover:bg-meta-1' />
              </Popconfirm>
            </Tooltip>
          </p>
        </div>
      </div>
      {/*  */}
      <section className='absolute py-16 top-[50%] w-[600px] left-[40%]'>
        <Outlet />
      </section>
    </section>
  )
}
export default DefaultLayoutTrangthi
{
  /*  */
}
{
  /* <div className='left-5 bottom-10 z-5 absolute w-[250px] items-center text-center bg-secondary rounded-lg h-[110px]'>
        <div className='pt-2 float-right pr-5 ' onClick={handelLogOut}>
          <Tooltip placement='leftTop' title={'Thời Gian Còn Lại !'}></Tooltip>
        </div>
        <div className='pt-6 float-left pl-2 '>
          <p className='text-md font-medium pl-2'>
            <span className='text-primary font-bold text-xl'>Tổng thời gian còn lại</span>{' '}
            <Countdown date={Date.now() + 60000} renderer={renderer} />,
          </p>
        </div>
      </div>
      <div className='left-[45%] bottom-10 z-5 absolute w-[120px] items-center text-center bg-warning rounded-lg h-[70px]'>
        <div className='pt-4 text-center ' onClick={handelLogOut}>
          <Tooltip placement='leftTop' title={'Thời Gian Còn Lại !'}></Tooltip>
          <span className='text-meta-1 font-bold text-2xl'>1/100</span>
        </div>
      </div> */
}
