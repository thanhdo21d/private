import React from 'react'
import ReactDOM from 'react-dom'
import warning from '../../../../assets/warning.png'
import { Button } from '~/components'
const PopError = () => {
  if (typeof document === 'undefined') return <div></div>
  const bodyElement = document.querySelector('#root')
  if (!bodyElement) {
    return null
  }
  return ReactDOM.createPortal(
    <div>
      <div className='rounded-xl fixed bottom-0 shadow border border-gray-100 z-[10000]  w-full h-full  flex flex-col bg-black bg-opacity-80'></div>
      <div className='flex justify-center '>
        <div className='rounded-xl fixed bottom-4 shadow border border-gray-100 z-[10000000]  w-full max-w-xl h-full max-h-[80vh] flex flex-col bg-white'>
          <div className='bg-danger rounded-md py-5'>
            <h2 className='text-center pt-5 font-semibold text-lg text-white'>Bài làm của bạn đã bị tạm dừng</h2>
          </div>
          <div className='flex justify-center'>
            <img className='w-[200px]' src={warning} alt='warning' />
          </div>
          <div className='flex justify-center'>
            <Button>Tiếp tục</Button>
          </div>
          <div className='absolute bottom-5 flex justify-center items-center mx-5'>
            <h3>
              <span className='text-black font-bold'>Lưu ý :</span> Việc tạm dừng do sự cố không ảnh hưởng đến kết quả
              của bạn <br /> Thời gian làm bài sẽ được bảo lưu đến khi sự cố kết thúc !
            </h3>
          </div>
        </div>
      </div>
    </div>,
    bodyElement
  )
}

export default PopError
