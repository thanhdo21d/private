import { Button } from '~/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SigninForm, siginSchema } from '~/schemas/login.schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toastService } from '~/utils/toask/toaskMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAppDispatch } from '~/store/root/hook'
import { setAccessToken } from '~/store/slice/getCookies.slice'
import { useGetAccessTokenMutation } from '~/apis/auth/signin.api'
import { setCookie, setProfileToLS } from '~/utils/utils'
import { useTranslation } from 'react-i18next'
import { locals } from '~/i18n/i18n'
import img from '../../../assets/images/logo/1111111111111.jpg'
import img2 from '../../../assets/images/logo/dmvn-logo.png'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import Cookies from 'js-cookie'
import { useContext, useEffect } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import { userLogin } from '~/types/users/userContext'
import { useGetAllBannersQuery, useGetIdBannersQuery } from '~/apis/banner/banner.api'
import { Skeleton } from 'antd'
const Signin = () => {
  const { i18n } = useTranslation()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { data: dataBannerID, isFetching } = useGetIdBannersQuery('652c9174be0b746b392bc8fb')
  const { t } = useTranslation(['header'])
  const currentLanguage = locals[i18n.language as keyof typeof locals]
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninForm>({
    resolver: yupResolver(siginSchema)
  })
  const [loginApi, { isLoading, isError, isSuccess }] = useGetAccessTokenMutation()
  const onSubmit = async (data: SigninForm) => {
    try {
      loginApi(data).then(({ data }: any) => {
        console.log(data, 'ok')
        if (data !== 'undefined') {
          setProfile(data.dataUser)
          setProfileToLS(data.dataUser)
          Cookies.set('token', data.accessToken, { expires: 1 })
        }
      })
    } catch (error) {
      console.log(error)
      toastService.error(t('product.login_error'))
    }
  }
  if (isError) {
    toastService.error(t('product.login_error'))
    Cookies.remove('token')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }
  if (isSuccess) {
    console.log(isSuccess)
    toastService.success(t('product.login_success'))
    navigate('/')
  }
  const changeLanguage = (lng: 'en' | 'vi') => {
    Cookies.set('language', lng)
    i18n.changeLanguage(lng)
  }
  const checkCookie = Cookies.get('token')
  useEffect(() => {
    if (checkCookie && checkCookie !== 'undefined') {
      navigate('/')
    }
  }, [checkCookie, navigate])
  return (
    <>
      {isFetching ? (
        <Skeleton />
      ) : (
        <section className='min-h-screen flex items-stretch text-white '>
          <Helmet>
            <title> Đăng Nhập </title>
            <meta name='description' />
          </Helmet>
          <div
            className='lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center'
            style={{
              backgroundImage: `url(${dataBannerID?.data?.url || img})`
            }}
          >
            <div className='absolute bg-black opacity-60 inset-0 z-0' />
            <div className='w-full px-24 z-10'>
              <motion.h1
                variants={fadeIn('down', 0.25)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className='text-5xl font-bold text-left tracking-wide'
              >
                Hệ Thống Thi Denso Vietnam
              </motion.h1>
              <motion.p
                variants={fadeIn('up', 0.25)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className='text-3xl my-4'
              >
                Exam System Denso Vietnam.
              </motion.p>
            </div>
            <div className='bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4'>
              Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
            </div>
          </div>
          <div
            className='lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0'
            style={{ backgroundColor: '#161616' }}
          >
            <div
              className='absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center'
              style={{
                backgroundImage: `url(${dataBannerID?.data?.url || img})`
              }}
            >
              <div className='absolute bg-black opacity-60 inset-0 z-0' />
            </div>
            <div className='w-full py-6 z-20'>
              <button
                className='py-2 px-3 text-left hover:bg-warning rounded-md shadow-xl'
                onClick={() => changeLanguage('vi')}
              >
                Tiếng Việt
              </button>
              <button
                className='mt-2 py-2 px-3 text-left hover:bg-warning rounded-md shadow-xl'
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
              {/* <span className='mx-1'>{currentLanguage}</span> */}
              <motion.p
                variants={fadeIn('up', 0.25)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className='text-meta-8 text-xl py-5'
              >
                {t('product.code_pass')}
              </motion.p>
              <form className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <div className='pb-4 pt-4'>
                  <label className='float-left pb-3' htmlFor='code'>
                    {t('product.name_login')}
                  </label>
                  <motion.input
                    variants={fadeIn('up', 0.25)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    type='text'
                    id='email'
                    {...register('email')}
                    placeholder='email'
                    className='block w-full p-4 text-lg rounded-sm cursor-pointer bg-black'
                  />
                  <p className='text-danger float-left font-medium text-md'>{errors.email && errors.email.message}</p>
                </div>
                <div className='pb-4 pt-4'>
                  <label className='float-left pb-3' htmlFor='password'>
                    {t('product.password')}
                  </label>
                  <motion.input
                    variants={fadeIn('up', 0.25)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.7 }}
                    className='block w-full p-4 cursor-pointer text-lg rounded-sm bg-black'
                    type='password'
                    id='password'
                    placeholder='Password'
                    {...register('password')}
                  />
                  <p className='text-danger float-left font-medium text-md'>
                    {errors.password && errors.password.message}
                  </p>
                </div>
                <div className='text-right text-gray-400 hover:underline hover:text-gray-100'>
                  <a onClick={() => alert('Vui Lòng Liên Hệ Phòng IS Để Lấy Lại Mật Khẩu !')}>
                    {t('product.forgot_password')}
                  </a>
                </div>
                <div className='px-4 pb-2 pt-4'>
                  <Button
                    type='submit'
                    styleClass='uppercase block w-full p-4 text-lg rounded-full  hover:bg-indigo-600 focus:outline-none'
                  >
                    {isLoading ? (
                      <AiOutlineLoading3Quarters className='animate-spin' />
                    ) : (
                      <span>{t('product.login')}</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
export default Signin
