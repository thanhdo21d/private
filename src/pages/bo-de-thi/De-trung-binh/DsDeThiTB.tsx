import React from 'react'
import { useNavigate } from 'react-router-dom'

const DsDeThiTB = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <div>
          <div className='grid grid-cols-3 gap-5'>
            <div className='max-h-full w-[400px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
              <div className='w-full'>
                <p className='text-danger text-center font-medium text-md'>Cấp Độ trung bình</p>
                <div className='m-8 my-20 max-w-[400px] mx-auto'>
                  <div className='mb-8'>
                    <div className='text-center mx-auto flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='48'
                        height='48'
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
                    <p className='text-gray-600 text-center'>Bộ Đề Thi Phòng Is.</p>
                  </div>
                  <div className='space-y-4 justify-center flex'>
                    <button
                      onClick={() => navigate('/')}
                      className='p-3 bg-black rounded-full text-white w-[70%] font-semibold'
                    >
                      Thêm Đề Thi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
            <div className='max-h-full w-[400px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
              <div className='w-full'>
                <div className='m-8 my-20 max-w-[400px] mx-auto'>
                  <div className='mb-8'>
                    <div className='text-center mx-auto flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='48'
                        height='48'
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
                    <p className='text-gray-600 text-center'>Bộ Đề Thi Phòng LOG.</p>
                  </div>
                  <div className='space-y-4 justify-center flex'>
                    <button
                      onClick={() => navigate('/')}
                      className='p-3 bg-black rounded-full text-white w-[70%] font-semibold'
                    >
                      Thêm Đề Thi
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}

            <div className='max-h-full w-[400px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
              <div className='w-full'>
                <div className='m-8 my-20 max-w-[400px] mx-auto'>
                  <div className='mb-8'>
                    <div className='text-center mx-auto flex justify-center'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        x='0px'
                        y='0px'
                        width='48'
                        height='48'
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
                    <p className='text-gray-600 text-center'>Bộ Đề Thi Phòng PC.</p>
                  </div>
                  <div className='space-y-4 justify-center flex'>
                    <button
                      onClick={() => navigate('/')}
                      className='p-3 bg-black rounded-full text-white w-[70%] font-semibold'
                    >
                      Thêm Đề Thi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DsDeThiTB
