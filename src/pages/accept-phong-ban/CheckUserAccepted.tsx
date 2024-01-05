import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CheckUserAccepted = () => {
  return (
    <div>
      <Result
        status='500'
        title='500'
        subTitle={
          <p className='text-xl font-bold text-black'>
            Hiện tại bạn chưa thuộc phòng ban nào ! , vui lòng liên hệ admin để sắp xếp bạn vào phòng phù hợp
          </p>
        }
        extra={
          <Link to='/' className=' text-white bg-primary p-2 rounded-md shadow-md'>
            Back Home
          </Link>
        }
      />
    </div>
  )
}

export default CheckUserAccepted
