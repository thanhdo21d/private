import React from 'react'
import { useNavigate } from 'react-router-dom'

const PopupSuccess = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10'>
        <div className='max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
          <div className='w-full'>
            <div className='m-8 my-20 max-w-[400px] mx-auto'>
              <div className='mb-8'>
                <div className='text-center mx-auto flex justify-center'>
                  <svg
                    className='animate-bounce'
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='68'
                    height='68'
                    viewBox='0 0 48 48'
                  >
                    <path
                      fill='#4caf50'
                      d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
                    ></path>
                    <path
                      fill='#ccff90'
                      d='M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z'
                    ></path>
                  </svg>
                </div>
                <p className='text-gray-600'>
                  Xin chúc mừng, bạn hoàn thành bài thi này nhanh thứ 5 trong số những ng tham gia.
                </p>
              </div>
              <div className='space-y-4'>
                <button
                  onClick={() => navigate('/')}
                  className='p-3 bg-black rounded-full text-white w-full font-semibold'
                >
                  Allow notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(PopupSuccess)
