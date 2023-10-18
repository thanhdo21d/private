import { Button, ConfigProvider, Result } from 'antd'
import { Helmet } from 'react-helmet-async'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div className='mt-[50px]'>
      <Helmet>
        <title> Trang Không Tồn Tại </title>
        <meta name='description' />
      </Helmet>
      <ConfigProvider
        theme={{
          components: {
            Result: {
              /* here is your component tokens */
              titleFontSize: 120,
              subtitleFontSize: 70,
            }
          }
        }}
      >
        <Result
          status='404'
          title='ERROR 404'
          className='text-2xl'
          subTitle='xin lỗi , trang bạn tìm kiếm không tồn tại ! .'
          extra={
            <Link className='flex justify-center' to='/'>
              <Button className='bg-danger text-white text-xl font-medium w-[200px] h-[45px] flex items-center gap-2'>
                <span>
                  <BsArrowReturnLeft />
                </span>{' '}
                <span>Back Home</span>{' '}
              </Button>
            </Link>
          }
        />
      </ConfigProvider>
    </div>
  )
}
export default NotFound
