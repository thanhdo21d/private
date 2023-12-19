import React, { useContext, useRef, useState } from 'react'
import { Button, Input, Skeleton, Table, Tooltip } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
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
  const {
    data: dataExamUser,
    isFetching: isExamUSerFetching,
    isLoading: isExamuserLoading
  } = useGetExamUserQuery(profile?._id as string)

  const data = dataExamUser?.exams.map((items: any) => ({
    key: items._id,
    name: items.nameExams,
    score: items.score,
    correct_answer: items.correct_answer,
    fail_answer: items.fail_answer,
    time: items.createdAt
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
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
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
      <div className='flex justify-between items-end'>
        <div className='mt-10 flex gap-5'>
          <Input
            className='h-[40px] w-[330px] 2xl:w-[600px] rounded-md border border-[#ccc]'
            placeholder='Nhập từ khóa tìm kiếm ....'
          />
          <Button className='w-[150px] h-[40px] bg-graydark text-white text-md font-medium'>Tìm Kiếm</Button>
        </div>
        <div className='flex items-center gap-8 '>
          <span className='text-black underline font-medium'>Chọn Ngày</span>
          <DatePicker onChange={onChange} />
        </div>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div>
          <Pagination pageSize={4} queryConfig={queryConfig} />
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
