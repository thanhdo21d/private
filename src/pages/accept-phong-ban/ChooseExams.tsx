import React, { useContext } from 'react'
import Slider from 'react-slick'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetAllExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { Empty } from 'antd'
import { IoMdReturnLeft } from 'react-icons/io'
import { AppContext } from '~/contexts/app.contexts'
import Pagination from '../roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import { Footer } from 'antd/es/layout/layout'
const ChooseExams = () => {
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)
  const { id } = useParams()
  const queryConfig = useQueryConfig()
  const [queryParameters] = useSearchParams()
  const datalimitQueryChange = queryParameters.get('limit')
  const search = queryParameters.get('search')
  const dataPageQuery: string | null = queryParameters.get('page')
  const {
    data: dataExamsCategories,
    isLoading: isDataExamsCategoriesLoading,
    isFetching
  } = useGetAllExamsCategoriesQuery({
    id: id,
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 6,
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
    <div className='flex justify-center'>
      {isDataExamsCategoriesLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className='w-10/12  bg-white bg-opacity-80 shadow-2xl rounded-sm'>
          <div className='grid grid-cols-3'>
            {dataExamsCategories?.examsKT?.examsKT
              ?.filter((items: any) => items.status == 'active')
              .map((data: any) => {
                console.log(data, 'data')
                return (
                  <div key={data._id} className=' m-5 cursor-pointer shadow-xl'>
                    <p className='font-semibold bg-graydark rounded-t px-4 flex justify-center items-center py-2'>
                      {data?.name}
                    </p>

                    <div className='grid grid-cols-12 bg-body px-4 gap-y-3 pt-10'>
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
                        Ngày Bắt Đầu : {data?.startDate.split('T')[0]}
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
                      <div className='col-span-11 text-sm flex items-center font-light pl-2'>
                        Ngày Kết Thúc : {data?.endDate.split('T')[0]}
                      </div>
                      <div className='col-span-12 mt-5 mb-5 text-gray-100'>
                        <button
                          className='rounded hover:bg-success bg-teal-500 w-full py-3'
                          onClick={() => navigate(`/ChoosExam/${data?._id}`)}
                        >
                          Tiếp Tục
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
                )
              })}
          </div>
          <Footer className='mt-5  flex justify-between dark:bg-black '>
            <div className='text-md font-semibold text-center dark:text-white'>
              Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
              <br />
              design by thanhdo
            </div>
            <div className=''>
              <Pagination pageSize={dataExamsCategories?.totalPages} queryConfig={queryConfig} />
            </div>
          </Footer>
        </div>
      )}
    </div>
  )
}

export default ChooseExams
