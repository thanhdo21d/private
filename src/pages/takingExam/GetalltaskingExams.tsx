import { Button, Divider, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllExamsQuery } from '~/apis/examSetting/examSetting'
import { Breadcrumb } from '~/components'

const GetalltaskingExams = () => {
  const { data: dataAll, isFetching, isLoading } = useGetAllExamsQuery({})
  const navigate = useNavigate()
  const dataSource = dataAll?.map((items: any) => ({
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
            <Button onClick={() => navigate(`/admin/taking/exam/${id}`)}>Chi tiết</Button>
          </div>
        )
      }
    }
  ]
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
      <Divider orientation='left'>Danh sách</Divider>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
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
