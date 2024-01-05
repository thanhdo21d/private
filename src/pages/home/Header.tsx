import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Popconfirm, Tooltip } from 'antd'
import { Helmet } from 'react-helmet-async'
import { RxAvatar } from 'react-icons/rx'
import { LuLogOut } from 'react-icons/lu'
import i18n from '~/i18n/i18n'
import Cookies from 'js-cookie'
import { removeProfileFromLS } from '~/utils/utils'
import styles from './header.module.css' // Import CSS module
import { AppContext } from '~/contexts/app.contexts'
import { useTranslation } from 'react-i18next'
import { DropdownUser } from '~/layouts/DefaultLayout/components/Header/components'

const Header = () => {
  const [scroll, setScroll] = useState(false)
  const { profile, reset } = useContext(AppContext)
  const { t } = useTranslation(['header'])
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
  const navigate = useNavigate()

  const handelScroll = () => {
    const offset = window.scrollY
    if (offset > 300) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
  }, [])

  return (
    <>
      <Helmet>
        <title> Đề Thi Khảo Sát </title>
        <meta name='description' />
      </Helmet>
      <header className={`${styles['main-header']} ${scroll ? styles['sticky-header'] : ''} `}>
        <div style={{ position: 'relative', zIndex: 1 }} className={styles['header-content']}>
          <div>
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
          </div>

          <div className=''>
            <div className='z-50 flex gap-2 justify-around  w-[600px] items-center text-center bg-black bg-opacity-50 rounded-lg h-[80px]'>
              <div
                className='pt-4 relative w-[50px] h-[50px]  bg-danger hover:bg-warning  rounded-full shadow-md cursor-pointer'
                onClick={handelLogOut}
              >
                <span className='absolute top-[11px] left-[12px]'>
                  <Tooltip placement='leftTop' title={t('product.logout')}>
                    <LuLogOut className='text-[30px]  ' />
                  </Tooltip>
                </span>
              </div>

              {/* <div className=''>
                <p className='text-md font-medium'>
                  <span className='pr-2'>{t('product.hello_user')} </span>{' '}
                  <span className='text-danger font-bold text-xl'>{profile?.username}</span>{' '}
                </p>
              </div> */}
              <div className='cursor-pointer   pl-2 '>
                {/* <p className='text-md font-medium '>
                  <Tooltip placement='leftTop' title={t('product.navigate_profile')}>
                    <Popconfirm
                      title={t('product.user_info')}
                      description={t('product.confirm_navigate_profile')}
                      onConfirm={confirm}
                      className=''
                      onCancel={cancel}
                      okButtonProps={{
                        style: { backgroundColor: 'blue', marginRight: '20px' }
                      }}
                      okText='Yes'
                      cancelText='No'
                    >
                      <RxAvatar className='text-[40px] hover:bg-warning' />
                    </Popconfirm>
                  </Tooltip>
                </p> */}
                <DropdownUser color={true}/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
