import { Empty, Popconfirm } from 'antd'
import React, { useContext } from 'react'
import logoUrl from '../../assets/images/logo/1111111111111.jpg'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import { Helmet } from 'react-helmet-async'
import { RxAvatar } from 'react-icons/rx'
import { LuLogOut } from 'react-icons/lu'
import { useTranslation } from 'react-i18next'
import i18n from '~/i18n/i18n'
import Cookies from 'js-cookie'
import { AppContext } from '~/contexts/app.contexts'
import { removeProfileFromLS } from '~/utils/utils'
const DefaultLayoutTrangthi = () => {
  const { profile, reset } = useContext(AppContext)
  const { t } = useTranslation(['header'])
  const navigate = useNavigate()
  const handelLogOut = () => {
    const logout = window.confirm('Bạn Có Muốn Đăng Xuất !')
    if (logout) {
      Cookies.remove('token')
      reset()
      removeProfileFromLS()
      navigate('/login')
    }
  }
  const confirm = () => {
    navigate('/user-info')
  }
  const cancel = () => {
    return
  }
  const changeLanguage = (lng: 'en' | 'vi') => {
    Cookies.set('language', lng)
    i18n.changeLanguage(lng)
  }
  return (
    <section className='min-h-screen  flex items-stretch text-white '>
      <Helmet>
        <title> Đề Thi Khảo Sát </title>
        <meta name='description' />
      </Helmet>
      <div
        className='lg:flex w-full z-0 hidden bg-login bg-no-repeat bg-cover relative items-center'
        style={{
          // backgroundImage: `url(${logoUrl})`
          backgroundImage: `url(https://img.meta.com.vn/Data/image/2021/09/30/background-la-gi-anh-background-dep-3.jpg)`
        }}
      ></div>
      <div className='absolute bg-black opacity-60 inset-0 z-0'></div>
      <div className='absolute left-5 top-5 flex gap-5'>
        <button
          className='py-2 px-3  bg-body w-[130px] text-center text-white font-bold hover:bg-warning rounded-md shadow-xl'
          onClick={() => changeLanguage('vi')}
        >
          Tiếng Việt
        </button>
        <button
          className='py-2 px-3  bg-body w-[130px] text-center text-white font-bold hover:bg-warning rounded-md shadow-xl'
          onClick={() => changeLanguage('en')}
        >
          English
        </button>
      </div>

      <div className='right-4 flex gap-2 justify-center top-5  absolute w-[500px] items-center text-center bg-bodydark2 rounded-lg h-[80px]'>
        <div
          className='pt-4 relative w-[50px] h-[50px]  bg-danger rounded-full shadow-md cursor-pointer'
          onClick={handelLogOut}
        >
          <span className='absolute top-[11px] left-[12px]'>
            <Tooltip placement='leftTop' title={t('product.logout')}>
              <LuLogOut className='text-[30px]  hover:bg-warning ' />
            </Tooltip>
          </span>
        </div>

        <div className=''>
          <p className='text-md font-medium'>
            <span className='pr-2'>{t('product.hello_user')} </span>{' '}
            <span className='text-danger font-bold text-xl'>{profile?.email}</span>{' '}
          </p>
        </div>
        <div className='cursor-pointer  pl-2 '>
          <p className='text-md font-medium'>
            <Tooltip placement='leftTop' title={t('product.navigate_profile')}>
              <Popconfirm
                title={t('product.user_info')}
                description={t('product.confirm_navigate_profile')}
                onConfirm={confirm}
                onCancel={cancel}
                okButtonProps={{
                  style: { backgroundColor: 'blue' }
                }}
                okText='Yes'
                cancelText='No'
              >
                <RxAvatar className='text-[40px] hover:bg-warning' />
              </Popconfirm>
            </Tooltip>
          </p>
        </div>
      </div>
      {/*  */}
      <section className='absolute py-16 top-[7%]  mx-auto w-full  '>
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
