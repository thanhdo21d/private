import { message } from 'antd'
import { PiKeyReturnFill } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components'
const HelloUser = () => {
  const navigate = useNavigate()
  const handelGoon = () => {
    navigate('/action-bai-thi')
    message.success('chúc bạn may mắn')
  }
  return (
    <div>
      <div className=' mx-auto px-4 w-[800px] '>
        <div className='  min-w-0 break-words h-[400px] bg-white w-full  shadow-xl rounded-lg '>
          <div className='px-6'>
            <div className='flex flex-wrap justify-center'>
              <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                <div className=''>
                  <img
                    loading='lazy'
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
                  <span className='pt-2 mt-2'> Nội dung thi: Tự luận - Trắc Nghiệm - thời gian làm bài 120 phút</span>
                  <span className=' pl-3'>(random 70/30) </span>
                </div>
              </div>
              <div className='w-full '>
                <div className=' mt-20  '>
                  <Button
                    styleClass='bg-boxdark flex m-auto  w-[80%] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                    type='button'
                    onClick={handelGoon}
                  >
                    Bắt Đầu Bài Thi
                    <PiKeyReturnFill />
                  </Button>
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
