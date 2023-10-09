import { Button } from '~/components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SigninForm, siginSchema } from '~/schemas/login.schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toastService } from '~/utils/toask/toaskMessage'
const Signin = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SigninForm>({
    resolver: yupResolver(siginSchema)
  })
  const onSubmit = async (data: SigninForm) => {
    try {
      console.log(data)
      toastService.success('Đăng Nhập Thành Công')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='min-h-screen flex items-stretch text-white '>
      <Helmet>
        <title> Đăng Nhập </title>
        <meta name='description' />
      </Helmet>
      <div
        className='lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)'
        }}
      >
        <div className='absolute bg-black opacity-60 inset-0 z-0' />
        <div className='w-full px-24 z-10'>
          <h1 className='text-5xl font-bold text-left tracking-wide'>Hệ Thống Thi  Vietnam</h1>
          <p className='text-3xl my-4'>Exam System  Vietnam.</p>
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
            backgroundImage:
              'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)'
          }}
        >
          <div className='absolute bg-black opacity-60 inset-0 z-0' />
        </div>
        <div className='w-full py-6 z-20'>
          <p className='text-meta-8 text-xl py-5'>Vui Lòng Nhập Code và password</p>
          <form className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto' onSubmit={handleSubmit(onSubmit)}>
            <div className='pb-4 pt-4'>
              <label className='float-left pb-3' htmlFor='code'>
                Tên Đăng Nhập
              </label>
              <input
                type='text'
                id='code'
                {...register('code')}
                placeholder='code'
                className='block w-full p-4 text-lg rounded-sm bg-black'
              />
              <p className='text-danger float-left font-medium text-md'>{errors.code && errors.code.message}</p>
            </div>
            <div className='pb-4 pt-4'>
              <label className='float-left pb-3' htmlFor='password'>
                Mật Khẩu
              </label>
              <input
                className='block w-full p-4 text-lg rounded-sm bg-black'
                type='password'
                id='password'
                placeholder='Password'
                {...register('password')}
              />
              <p className='text-danger float-left font-medium text-md'>{errors.password && errors.password.message}</p>
            </div>
            <div className='text-right text-gray-400 hover:underline hover:text-gray-100'>
              <a onClick={() => alert('Vui Lòng Liên Hệ Phòng IS Để Lấy Lại Mật Khẩu !')}>Forgot your password?</a>
            </div>
            <div className='px-4 pb-2 pt-4'>
              <Button
                type='submit'
                styleClass='uppercase block w-full p-4 text-lg rounded-full  hover:bg-indigo-600 focus:outline-none'
              >
                sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default Signin
