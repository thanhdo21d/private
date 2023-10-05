import { Button, Result } from "antd"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div className='mt-[150px]'>
      <Helmet>
        <title> Trang Không Tồn Tại </title>
        <meta name='description' />
      </Helmet>
      <Result
        status='404'
        title='404'
        subTitle='xin lỗi , trang bạn tìm kiếm không tồn tại ! .'
        extra={
          <Link to='/'>
            <Button className='bg-blue-500 '>Back Home</Button>
          </Link>
        }
      />
    </div>
  )
}
export default NotFound
