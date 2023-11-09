import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Button } from '~/components'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
import { AppContext } from '~/contexts/app.contexts'
import { Empty, Radio } from 'antd'
import logoAction from '../../assets/hello.png'
import { TypeAnimation } from 'react-type-animation'
import { useGetAllDepartmentQuery } from '~/apis/department/department'
import { IDepartmentType, category } from '~/types/department/department.type'
import { useGetAllCategoriesQuery } from '~/apis/category/categories'
import { useGetAllExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
const AcceptUserDipament = () => {
  const [checkConcept, setCheckConcept] = useState<boolean>(false)
  const { data: dataAllCategories, isFetching: isGetCategoriesLoading } = useGetAllCategoriesQuery()
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('department')
  const {
    data: dataExamsCategories,
    isLoading: isDataExamsCategoriesLoading,
    isFetching
  } = useGetAllExamsCategoriesQuery(dataPageQuery as string)
  console.log(dataExamsCategories)
  const { t } = useTranslation(['header'])
  const { profile } = useContext(AppContext)
  const dataSearchQuery: string | null = queryParameters.get('department')
  const navigate = useNavigate()
  const handelGoon = () => {
    if (dataSearchQuery != null) {
      setCheckConcept(!checkConcept)
    } else {
      alert('Vui Lòng Chọn Phòng Ban')
      return false
    }
  }
  return (
    <div className='relative'>
      <div>
        {checkConcept ? (
          <div>
            <div className='h-full w-[50%] mx-auto rounded-sm shadow-md flex gap-15  justify-center items-center bg-black bg-opacity-30 from-indigo-600 via-indigo-700 to-indigo-700'>
              {dataExamsCategories?.exam?.examsKT.length > 0 ? (
                dataExamsCategories?.exam?.examsKT?.map((data: any) => {
                  console.log(data)
                  return (
                    <div
                      key={data?._id}
                      className='rounded bg-white bg-opacity-30 w-72 m-5 shadow-xl hover:bg-success flex flex-col text-gray-200'
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
                        <div className='col-span-11 text-sm flex items-center font-semibold pl-2'>
                          Thời Gian Làm Bài 120p
                        </div>
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
                        <div className='col-span-11 text-sm flex items-center font-light pl-2'>
                          Tên Account : DMVN 972524
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
                          Lưu ý : Không tự ý thoát khi làm bài
                        </div>
                        {/* CTA Button */}
                        <div className='col-span-12 mt-20 mb-5 text-gray-100'>
                          <button
                            className='rounded hover:bg-success bg-teal-500 w-full py-3'
                            onClick={() => navigate(`/ChoosExam/${data?._id}`)}
                          >
                            Bắt Đầu Ôn Thi
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <Empty className='bg-white bg-opacity-50' />
              )}
              {/* end */}
            </div>
          </div>
        ) : (
          <div className=' mx-auto mt-20 px-4 w-[1000px] '>
            <div className='relative  min-w-0 break-words h-[400px] bg-white opacity-90 w-full  shadow-xl rounded-lg '>
              <div className='flex flex-wrap pt-3 justify-center'>
                <motion.p
                  variants={fadeIn('down', 0.25)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{ once: false, amount: 0.7 }}
                  className='text-blue23 text-xl font-bold'
                >
                  {t('product.accept_user_helo')}
                </motion.p>
              </div>
              <div className='px-6'>
                <div className='text-sm float-left leading-normal mt-0 mb-2 text-blueGray-400 font-bold '>
                  <p className='my-1'> {profile?.email} </p>
                </div>
                <div className='mt-5 py-10 border-t border-blueGray-200 text-center'>
                  <div className='flex justify-center'>
                    <Radio.Group
                      className='grid grid-cols-4 gap-5 items-center'
                      defaultValue='a'
                      buttonStyle='solid'
                      style={{ marginTop: 16 }}
                    >
                      {dataAllCategories?.data
                        .filter((items: category) => items.parentCheck !== '0')
                        .map((items: IDepartmentType) => {
                          return (
                            <div key={items._id}>
                              <Radio.Button
                                className='w-[200px]  hover:bg-warning hover:text-white font-medium hover:scale-95 rounded-none'
                                value='a'
                                onClick={() =>
                                  navigate({
                                    search: createSearchParams({
                                      department: items._id
                                    }).toString()
                                  })
                                }
                              >
                                {items.name}
                              </Radio.Button>
                            </div>
                          )
                        })}
                    </Radio.Group>
                  </div>
                  <div className='w-full absolute  bottom-5 '>
                    <div className=''>
                      <Button
                        styleClass='bg-success flex m-auto hover:bg-danger   w-[80%] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                        type='button'
                        onClick={handelGoon}
                      >
                        {t('product.enter_bt')}
                        <PiKeyReturnFill />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {profile?.role.name !== 'Staff' && (
        <div className='absolute right-15 -bottom-[15rem] flex '>
          <div className='w-[300px] h-[99px] shadow-xl rounded-md bg-white'>
            <p className='text-black font-medium text-left pl-5 pt-3'>
              <TypeAnimation sequence={['Quay Về Trang Quản Trị', 1000, '']} speed={50} repeat={Infinity} />
            </p>
            <div>
              <Button onClick={() => navigate('/admin')} styleClass='h-[30px] rounded-sm ml-5 mt-5 hover:bg-warning'>
                Trở Về
              </Button>
            </div>
          </div>
          <div>
            <img className='w-[220px]' src={`${logoAction}`} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AcceptUserDipament
