import React, { useState } from 'react'
import { Card, Col, Row, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetIdExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { IoMdReturnLeft } from 'react-icons/io'
const ChoosExam = () => {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }
  const { id } = useParams()
  const { data: dataIdExmas, isLoading, isFetching } = useGetIdExamsCategoriesQuery(id as string)
  console.log(dataIdExmas)
  return (
    <div>
      <div className='grid grid-cols-4 justify-center'>
        {isLoading || isFetching ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          dataIdExmas?.data?.topicExams.map((data: any) => {
            console.log(data)
            return (
              <div
                key={data?._id}
                className='rounded bg-white bg-opacity-30 w-72 m-5 shadow-xl hover:bg-success flex flex-col text-gray-200 '
              >
                {/* Title */}
                <p className='font-semibold bg-white bg-opacity-20 rounded-t px-4 py-2'>{data?.name}</p>
                {/* Pricing */}
                <div className='flex flex-row items-center pt-8 bg-white bg-opacity-10 pl-12 pr-10 gap-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-base'> phòng ban </span>
                    <p className='text-5xl font-semibold'>IS</p>
                  </div>
                </div>
                {/* Pricing Additional Description */}
                <div className='flex flex-row items-center justify-center bg-white bg-opacity-10 pt-5 pb-10'>
                  <p className='text-xs text-gray-300 border border-gray-50 border-opacity-20 rounded-full py-1 px-2'>
                    Nội dung ôn tập : topic
                  </p>
                </div>
                <div className='grid grid-cols-12 bg-white bg-opacity-20 px-4 gap-y-3 pt-10'>
                  {/* Details 1 */}
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <div className='col-span-11 text-sm flex items-center font-semibold pl-2'>Thời Gian Làm Bài 120p</div>
                  {/* Line */}
                  <div className='col-span-12 h-[1px] bg-white bg-opacity-20' />
                  {/* Details 2 */}
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                    </svg>
                  </div>
                  <div className='col-span-11 text-sm flex items-center font-light pl-2'>
                    Hình Thức Thi : Tự Luận Trắc Nghiệm
                  </div>
                  {/* Details 3 */}
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <div className='col-span-11 text-sm flex items-center font-light pl-2'>Tên Account : DMVN 972524</div>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                  </div>
                  <div className='col-span-11 text-sm flex items-center font-light pl-2'>
                    Lưu ý : Không tự ý thoát khi làm bài
                  </div>
                  {/* CTA Button */}
                  <div className='col-span-12 mt-20 mb-5 text-gray-100'>
                    <button
                      className='rounded hover:bg-success bg-teal-500 w-full py-3'
                      onClick={() => navigate(`/action-bai-thi`)}
                    >
                      Bắt Đầu Ôn Thi
                    </button>
                    <button
                      className='rounded hover:bg-warning bg-teal-500 w-full py-3 mt-5 flex items-center gap-3 justify-around'
                      onClick={() => navigate('/')}
                    >
                      <span>Quay Lại</span>
                      <span>
                        <IoMdReturnLeft className='text-white font-bold text-2xl' />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default ChoosExam
