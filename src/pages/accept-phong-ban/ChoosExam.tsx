import React, { useContext, useState } from 'react'
import { Card, Col, Empty, Form, Input, Row, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetIdExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { IoMdReturnLeft } from 'react-icons/io'
import { AppContext } from '~/contexts/app.contexts'
import { Footer } from 'antd/es/layout/layout'
import Pagination from '../roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import axios from 'axios'
import Cookies from 'js-cookie'
import cancel from '../../assets/close.png'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { pause } from '~/utils/utils'
import { useGetIdUserQuery } from '~/apis/user/user.api'
import { useUpdateSesionUSerMutation } from '~/apis/topicQuestion/topicQuestion'
const ChoosExam = () => {
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)
  const [updateSessionUser] = useUpdateSesionUSerMutation()
  const {
    data: dataUser,
    isLoading: isUserLoading,
    isFetching: isUserFetching
  } = useGetIdUserQuery(profile?._id as string)

  const [checkSecret, setCheckSecret] = useState(false)
  const token = Cookies.get('token')
  console.log(`Access token: ${token}`)
  const [isLoadingSecret, setIsLoading] = useState(false)
  const uri = import.meta.env.VITE_API
  const queryConfig = useQueryConfig()
  const { id } = useParams()
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const idExams = sessionStorage.getItem('idSession')
  const search: string | null = queryParameters.get('search')
  const {
    data: dataIdExmas,
    isLoading,
    isFetching
  } = useGetIdExamsCategoriesQuery({
    id: id,
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 4,
    search: search || ''
  })
  const onFinish = async ({ secret }: { secret: string }) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(
        `${uri}check/secretKey/${idExams}`,
        {
          secret_key: secret
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (data === true) {
        try {
          const { data } = await axios.get(`${uri}start/${idExams}`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          console.log(data)
          const dataCheck = await axios.get(`${uri}examstatus/${data.id}`, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          console.log(dataCheck.data)
          if (dataCheck.data.status) {
            sessionStorage.setItem('idSession2', data.id)
            navigate(`/action-bai-thi/${idExams}`)
            updateSessionUser({
              id: profile?._id as string,
              idSessionExam: idExams as string
            })
              .unwrap()
              .then(() => console.log('1'))
          } else {
            toastService.error(dataCheck.data.msg)
          }
        } catch (error: any) {
          console.log(error)
          toastService.error(error.response.data.message)
        }
      } else {
        toastService.error('vui lòng nhập lại mã bảo mật')
      }
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      console.log(error)
      toastService.error(error.response.data.message)
    }
  }
  console.log(dataUser)
  if (isUserLoading || isUserFetching)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div className='flex justify-center'>
      {dataIdExmas?.data?.topicExams?.length == 0 && (
        <div className='flex justify-center mx-auto'>
          <Empty />
        </div>
      )}
      <div className='w-11/12  bg-white bg-opacity-80 shadow-2xl rounded-sm'>
        {checkSecret && (
          <motion.div
            variants={fadeIn('down', 0.25)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className='relative -top-10'
          >
            <div className='flex justify-center'>
              <div className='rounded-md absolute z-99999 border w-2/3 border-stroke shadow-2xl bg-white h-[220px]  dark:border-strokedark dark:bg-boxdark'>
                <div className='border-b py-3 border-[#ccc] flex justify-between'>
                  <h3 className='pl-4 text-black'>Thông báo bạn cần nhập mã bảo mật Code để vào thi</h3>
                  <img
                    onClick={() => setCheckSecret(false)}
                    className='w-[25px] mr-5 hover:scale-110 cursor-pointer'
                    src={cancel}
                  />
                </div>
                <div className='flex items-end justify-between mt-4'>
                  <div className='flex items-end justify-between mt-4'>
                    <Form
                      name='basic'
                      onFinish={onFinish}
                      style={{ display: 'flex', justifyContent: 'start' }}
                      initialValues={{ remember: true }}
                      autoComplete='off'
                    >
                      <Form.Item
                        label=' mã bảo mật'
                        name='secret'
                        rules={[{ required: true, message: 'vui lòng nhập mã bảo mật!' }]}
                      >
                        <Input placeholder='Thòi gian' prefix={<FieldTimeOutlined />} />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 5, span: 11 }}>
                        <Button styleClass='py-1.5 w-[120px]' type='submit'>
                          {isLoadingSecret ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Submit'}
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className='flex items-center justify-end mt-4 gap-5 pr-5 border-t border-[#ccc]'>
                  <Button
                    onClick={() => setCheckSecret(false)}
                    styleClass='!px-0 py-1 w-[100px] bg-[#ec971f] border border[#d58512] rounded-sm mt-5'
                  >
                    Từ chối
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className='grid grid-cols-3 justify-center'>
          {isLoading || isFetching ? (
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <>
              {dataIdExmas?.data?.topicExams
                ?.filter((items: any) => items.status == 'active')
                .map((data: any) => {
                  console.log(data, 'ok')
                  return (
                    <div
                      key={data?._id}
                      className='rounded bg-white bg-opacity-30  m-5 shadow-xl hover:bg-success flex flex-col text-gray-200 '
                    >
                      <p className='font-semibold bg-graydark rounded-t px-4 py-2'>{data?.name}</p>
                      <div className='grid grid-cols-12 bg-body cursor-pointer px-4 gap-y-3 pt-10'>
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
                          Thời Gian Làm Bài {data?.time} <span className='text-md font-medium'> (phút)</span>
                        </div>
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
                        <div className='col-span-11 text-sm flex items-center font-light pl-2'>
                          Tên Account : {profile?.code}
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
                        <div className='col-span-12 mt-20 mb-5 text-gray-100'>
                          {data._id?.toString() === dataUser?.user?.idSessionExam?.toString() ? (
                            <button
                              className='rounded hover:bg-danger bg-warning w-full py-3 cursor-not-allowed'
                              onClick={() => {
                                alert('Bạn đã ở trong bài thi này')
                              }}
                            >
                              Bạn đã ở trong bài thi này
                            </button>
                          ) : (
                            <button
                              className='rounded hover:bg-success bg-teal-500 w-full py-3'
                              onClick={() => {
                                setCheckSecret(true)
                                sessionStorage.setItem('idSession', data._id)

                                // return navigate({
                                //   search: createSearchParams({
                                //     ...queryConfig,
                                //     idExams: data._id
                                //   }).toString()
                                // })
                              }}
                            >
                              Bắt Đầu Thi
                            </button>
                          )}

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
                })}
            </>
          )}
        </div>
        <Footer className='mt-5  flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            design by thanhdo
          </div>
          <div className=''>
            <Pagination pageSize={dataIdExmas?.totalPages} queryConfig={queryConfig} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default ChoosExam
