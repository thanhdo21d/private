import React, { useContext, useRef, useState } from 'react'
import { Button, Form, Input, Skeleton, Table, Tooltip } from 'antd'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
import { useGetExamUserQuery } from '~/apis/user/user.api'
import { AppContext } from '~/contexts/app.contexts'
import details from '../../assets/details.png'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import Pagination from '../roles/Pagination'
import type { DatePickerProps } from 'antd'
import { DatePicker, Space } from 'antd'
import { Loader } from '~/common'
const InfoResult: React.FC = () => {
  const { profile } = useContext(AppContext)
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const [queryParameters] = useSearchParams()
  const dataisCheckQuery: string | null = queryParameters.get('isCheck')
  const pageQuery: string | null = queryParameters.get('page')
  const dataNameQuery: string | null = queryParameters.get('nameExams')
  const {
    data: dataExamUser,
    isFetching: isExamUSerFetching,
    isLoading: isExamuserLoading
  } = useGetExamUserQuery({
    id: profile?._id as string,
    limit: '10',
    page: (pageQuery as string) || '1',
    search: dataNameQuery || '',
    isCheck: dataisCheckQuery || '0'
  })
  console.log(dataExamUser)
  const data = dataExamUser?.data?.exams.map((items: any) => ({
    key: items._id,
    name: items.nameExams,
    score: items.score,
    correct_answer: items.correct_answer,
    fail_answer: items.fail_answer,
    time: items.createdAt,
    isCheck: items.isCheck
  }))

  const columns = [
    {
      title: 'Tên Bài Thi',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <p className='flex justify-center'>Điểm</p>,
      dataIndex: 'score',
      key: 'score',
      render: (text: string) => <a className='text-md font-bold flex justify-center'>{text}</a>
    },
    {
      title: <p className='flex justify-center'>Số Câu Đúng</p>,
      dataIndex: 'correct_answer',
      key: 'correct_answer',
      render: (text: string) => <a className='text-md font-bold flex justify-center'>{text}</a>
    },
    {
      title: <p className='flex justify-center'>Số Câu Sai</p>,
      dataIndex: 'fail_answer',
      key: 'fail_answer',
      render: (text: string) => <a className='text-md font-bold flex justify-center'>{text}</a>
    },
    {
      title: <p className='flex justify-center'>Ngày thi</p>,
      dataIndex: 'time',
      key: 'time',
      render: (text: string) => <a className='text-md font-bold flex justify-center'>{text.split('T')[0]}</a>
    },
    {
      title: <p className='flex justify-center'>Trạng thái</p>,
      dataIndex: 'isCheck',
      key: 'isCheck',
      render: (text: string) => {
        return (
          <p className={`flex justify-center font-bold ${text == '0' ? 'text-danger' : 'text-success '}`}>
            {text == '0' ? 'Chưa Chấm' : 'Đã chấm'}
          </p>
        )
      }
    },
    {
      title: <p className='flex mx-auto justify-center'>Hành Động</p>,
      render: ({ key: id }: { key: number | string }) => (
        <div className='flex mx-auto justify-center'>
          <Tooltip title='chi tiết'>
            <img
              onClick={() => navigate(`/user-info/ket-qua-thi/${id}`)}
              className='w-[32px] cursor-pointer hover:scale-110 ease-linear'
              src={details}
            />
          </Tooltip>
        </div>
      )
    }
  ]
  const onFinish = ({ username }: { username: string }) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        nameExams: username
      }).toString()
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        nameExams: ''
      }).toString()
    })
  }
  if (isExamUSerFetching || isExamuserLoading)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div>
      <div className='flex justify-between '>
        <div className='mt-10 flex gap-5'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item name='username' rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input
                className='h-[40px] w-[330px] 2xl:w-[600px] rounded-md border border-[#ccc]'
                placeholder='Nhập từ khóa tìm kiếm ....'
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' className='w-[150px] h-[40px] bg-graydark text-white text-md font-medium'>
                Tìm Kiếm
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='flex justify-between items-center'>
          <div className=' w-[250px] px-3 mb-6 md:mb-0'>
            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-state'>
              Trạng Thái
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='grid-state'
                onChange={(event) => {
                  const selectedValue = event.target.value
                  navigate({
                    search: createSearchParams({
                      ...queryConfig,
                      isCheck: selectedValue
                    }).toString()
                  })
                }}
              >
                <option value='0'>Chưa chấm</option>
                <option value='1'>Đã chấm</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div>
          <Pagination pageSize={dataExamUser.totalPages} queryConfig={queryConfig} />
        </div>
      </div>
      <Footer className='mt-5 flex justify-between dark:bg-black rounded-md'>
        <div className='text-md font-semibold text-center dark:text-white'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
        <div className='text-md font-semibold text-center dark:text-white'>design by thanhdo IS.</div>
      </Footer>
    </div>
  )
}
export default InfoResult
