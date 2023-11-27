import React from 'react'
import Slider from 'react-slick'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetAllExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { Empty } from 'antd'
import { IoMdReturnLeft } from 'react-icons/io'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const ChooseExams = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [queryParameters] = useSearchParams()
  const datalimitQueryChange = queryParameters.get('limit')
  const search = queryParameters.get('search')
  const {
    data: dataExamsCategories,
    isLoading: isDataExamsCategoriesLoading,
    isFetching
  } = useGetAllExamsCategoriesQuery({
    id: id,
    page: 1,
    limit: datalimitQueryChange || 10,
    search: search || ''
  })
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    draggable: true
  }
  return (
    <div>
      {isDataExamsCategoriesLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <Slider {...settings}>
          {dataExamsCategories?.examsKT?.examsKT.length > 0 ? (
            dataExamsCategories?.examsKT?.examsKT.map((data: any) => (
              <div key={data._id} className='w-72 m-5 cursor-pointer shadow-2xl '>
                <p className='font-semibold bg-white bg-opacity-20 rounded-t px-4 py-2'>{data?.name}</p>
                <div className='flex flex-row items-center pt-8 bg-white bg-opacity-10 pl-12 pr-10 gap-3'>
                  <div className='flex items-center gap-1'>
                    <span className='text-base'> phòng ban </span>
                    <p className='text-5xl font-semibold'>IS</p>
                  </div>
                </div>
                <div className='flex flex-row items-center justify-center bg-white bg-opacity-10 pt-5 pb-10'>
                  <p className='text-xs text-gray-300 border border-gray-50 border-opacity-20 rounded-full py-1 px-2'>
                    Nội dung ôn tập : topic
                  </p>
                </div>
                <div className='grid grid-cols-12 bg-white bg-opacity-20 px-4 gap-y-3 pt-10'>
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
                  <div className='col-span-12 h-[1px] bg-white bg-opacity-20' />
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
                  <div className='col-span-12 mt-5 mb-5 text-gray-100'>
                    <button
                      className='rounded hover:bg-success bg-teal-500 w-full py-3'
                      onClick={() => navigate(`/ChoosExam/${data?._id}`)}
                    >
                      Bắt Đầu Ôn Thi
                    </button>
                    <button
                      className='rounded hover:bg-warning bg-teal-500 w-full py-3 mt-5 flex items-center gap-3 justify-around'
                      onClick={() => navigate(`/`)}
                    >
                      <span>Quay Lại</span>
                      <span>
                        <IoMdReturnLeft className='text-white font-bold text-2xl' />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Empty className='bg-white bg-opacity-50' />
          )}
        </Slider>
      )}
    </div>
  )
}

export default ChooseExams
