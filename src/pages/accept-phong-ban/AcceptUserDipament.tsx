import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Button } from '~/components'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { AppContext } from '~/contexts/app.contexts'
import { IDepartmentType } from '~/types/department/department.type'
import { useGetAllCategoriesDepartmentQuery } from '~/apis/category/categories'
import { Footer } from 'antd/es/layout/layout'
import Pagination from '../roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
const AcceptUserDipament = () => {
  const queryConfig = useQueryConfig()
  const [queryParameters] = useSearchParams()
  const dataPageQueryPage: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const {
    data: dataAllCategoriesDepartment,
    isLoading: isGetCategoriesDepartmentLoading,
    isFetching
  } = useGetAllCategoriesDepartmentQuery({
    page: dataPageQueryPage || 1,
    limit: datalimitQueryChange || 6,
    search: search || ''
  })
  const dataPageQuery: string | null = queryParameters.get('department')
  const { t } = useTranslation(['header'])
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const handelGoon = () => {
    if (dataPageQuery != null) {
      navigate(`/choose-exam/${dataPageQuery}`)
    } else {
      alert('Vui Lòng Chọn Phòng Ban')
      return false
    }
  }
  if (isGetCategoriesDepartmentLoading || isFetching) return <p>loading...........</p>
  return (
    <div className='relative'>
      <div>
        <div className=' mx-auto mt-20 px-4 w-5/6  '>
          <div className='relative  min-w-0 break-words h-[500px] bg-white opacity-90 w-full  shadow-xl rounded-lg '>
            <div className='flex flex-wrap pt-3 justify-center'>
              <motion.p
                variants={fadeIn('down', 0.25)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className='text-graydark text-xl font-bold'
              >
                {t('product.accept_user_helo')}
              </motion.p>
            </div>
            <div className=''>
              <div className='text-sm float-left leading-normal mt-0  text-blueGray-400 font-bold '>
                <p className='my-1 px-6'>
                  <span className='text-black font-bold'> xin chào</span> {profile?.email}
                </p>
              </div>
              <div className='mt-5 py-10 border-t border-blueGray-200 text-center'>
                <div className=''>
                  <div className='grid grid-cols-2 gap-5 items-center px-6' defaultValue='a' style={{ marginTop: 16 }}>
                    {dataAllCategoriesDepartment?.data.map((items: IDepartmentType) => {
                      return (
                        <div className='flex justify-center items-center' key={items._id}>
                          <div
                            className='w-full h-[45px]  hover:bg-warning border border-[#ccc] cursor-pointer bg-bodydark flex justify-center shadow-2xl rounded-md items-center  hover:text-white font-medium hover:scale-105 '
                            onClick={() =>
                              navigate({
                                search: createSearchParams({
                                  department: items._id
                                }).toString()
                              })
                            }
                          >
                            {items.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className='w-full absolute  bottom-0 '>
                  <div className=''>
                    <Button
                      styleClass='bg-success flex m-auto hover:bg-danger  w-[80%] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={handelGoon}
                    >
                      {t('product.enter_bt')}
                      <PiKeyReturnFill />
                    </Button>
                  </div>
                  <Footer className='mt-5  flex justify-between dark:bg-black '>
                    <div className='text-md font-semibold text-center dark:text-white'>
                      Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
                      <br />
                      design by thanhdo
                    </div>
                    <div className=''>
                      <Pagination pageSize={dataAllCategoriesDepartment?.totalPages} queryConfig={queryConfig} />
                    </div>
                  </Footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AcceptUserDipament
