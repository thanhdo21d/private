import { Tooltip, message } from 'antd'
import React from 'react'
import { PiKeyReturnFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components'

const HelloUser = () => {
  const navigate = useNavigate()
  const handelGoon = ()=>{
    navigate('/action-bai-thi')
    message.success("chúc bạn may mắn")
  }
  return (
    <div>
      <div className='container mx-auto px-4'>
        <div className='  min-w-0 break-words h-[400px] bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
          <div className='px-6'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                <div className=''>
                  <img
                    alt='...'
                    src='https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
                    className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-16 lg:-ml-20  max-w-150-px'
                  />
                </div>
              </div>
            </div>
            <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
              <div className='text-center mt-12'>
                <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2'>Vũ Thành Đô</h3>
                <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <span className='float-left font-bold'>Lưu ý:</span> <br />{' '}
                  <span className='pt-2 mt-2'>- Nội dung thi: Tự luận - Trắc Nghiệm - thời gian làm bài 120 phút</span>{' '}
                  <span className='float-left pl-3'> (random 70/30) </span>
                </div>
              </div>
              <div className='w-full '>
                <div className=' mt-20 '>
                  <Tooltip placement='top' title={'Quay Lại Trang Cá Nhân !'}>
                    <Button
                      styleClass='bg-boxdark w-[300px] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={handelGoon}
                    >
                      Bắt Đầu Bài Thi
                      <PiKeyReturnFill />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelloUser
