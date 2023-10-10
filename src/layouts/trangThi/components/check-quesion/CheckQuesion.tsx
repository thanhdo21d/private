import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Button } from '~/components'
const CheckQuesion = () => {
  return (
    <div>
      <div>
        <div className=' mx-auto px-4'>
          <div className=' min-w-0 w-[500px] break-words h-[600px] bg-white  shadow-xl rounded-lg relative'>
            <p className='text-xl py-5 font-bold text-form-input text-center items-center'>Tổng số câu hỏi: 40</p>
            <div className='border-t-4 w-[300px] mx-auto text-center  border-gray mb-5'></div>
            <div className='px-6 gird grid-cols-5 flex gap-3 '>
              <div className='w-[40px]  h-[40px] rounded-full bg-blue23 text-center items-center'>
                <span className='font-bold text-xl pt-2'>1</span>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-graydark text-center items-center'>
                <span className='font-bold text-xl pt-2'>2</span>
              </div>
            </div>
            {/*  */}
            <Footer className='absolute bottom-0 w-full rounded-xl'>
              <div className='flex gap-5'>
                <div className='w-[30px] h-[30px] rounded-full bg-blue23 text-center items-center'></div>
                <div>
                  <p>Câu hỏi đã làm</p>
                </div>
              </div>
              <div className='flex gap-5 mt-3'>
                <div className='w-[30px] h-[30px] rounded-full bg-graydark text-center items-center'></div>
                <div>
                  <p> Câu hỏi chưa làm</p>
                </div>
              </div>
            </Footer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckQuesion
