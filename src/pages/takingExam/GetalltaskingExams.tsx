import { Button, Divider, Form, Input, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllExamsQuery } from '~/apis/examSetting/examSetting'
import { Breadcrumb } from '~/components'
const GetalltaskingExams = () => {
  const [queryParameters] = useSearchParams()
  const search: string | null = queryParameters.get('search')
  const {
    data: dataAll,
    isFetching,
    isLoading
  } = useGetAllExamsQuery({
    search: search
  })
  const navigate = useNavigate()
  const dataSource = dataAll
    ?.filter((items: any) => items.isEdit == '0')
    ?.map((items: any) => ({
      key: items._id,
      name: items.name,
      startDate: items.startDate,
      endDate: items.endDate,
      time: items.time
    }))
  const columns = [
    {
      title: 'Tên bài thi',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => {
        return <p>{date.split('T')[0]}</p>
      }
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => {
        return <p>{date.split('T')[0]}</p>
      }
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => {
        return <p>{time} phút</p>
      }
    },
    {
      title: <p className='flex justify-center'>Tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center'>
            <Button onClick={() => navigate(`/admin/user/taking/exam/${id}`)}>Chi tiết</Button>
          </div>
        )
      }
    }
  ]
  const onFinishSearch = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        search: keywordSpace
      }).toString()
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        search: ''
      }).toString()
    })
  }
  if (isFetching || isLoading)
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
      <Breadcrumb pageName='Danh sách bài thi' />
      <Form onFinish={onFinishSearch} onFinishFailed={onFinishFailed} className='flex gap-5' layout='vertical'>
        <Form.Item name='keyword' className='' rules={[{ required: true, message: 'vui lòng nhập Tên Bài thi ...!' }]}>
          <Input className='w-[250px] xl:w-[330px] border border-[#ccc]' placeholder='vui lòng nhập Tên Bài thi ...!' />
        </Form.Item>
        <Form.Item>
          <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' type='submit'>
            Submit
          </button>
        </Form.Item>
      </Form>
      <Divider orientation='left'>Danh sách</Divider>
      <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
      <div>
        <Footer className='mt-5 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            Design by ThanhDo IS
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default GetalltaskingExams
