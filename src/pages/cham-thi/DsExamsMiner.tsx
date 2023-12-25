import { Button, Divider, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckExaminerQuery } from '~/apis/examSetting/examSetting'
import { AppContext } from '~/contexts/app.contexts'

const DsExamsMiner = () => {
  const { profile, reset } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    data: dataCheckExaminer,
    isLoading: CheckExaminerLoading,
    isFetching: CheckExaminerFetching
  } = useCheckExaminerQuery({
    id: profile?._id as string
  })
  const dataSource = dataCheckExaminer?.map(
    ({ _id, name, startDate, endDate }: { _id: string; name: string; startDate: string; endDate: string }) => ({
      key: _id,
      name: name,
      startDate: startDate,
      endDate: endDate
    })
  )

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
      title: <p className='flex justify-center'>Tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center'>
            <Button onClick={() => navigate(`/examiner-Exams/${id}`)}>Chấm thi</Button>
          </div>
        )
      }
    }
  ]

  if (CheckExaminerLoading || CheckExaminerFetching)
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
      <div className='mb-5'>
        <Divider orientation='left'>Danh sách bài thi </Divider>
      </div>
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
      </div>
      <div>
        <Footer className='mt-5  flex justify-between '>
          <div className='text-md font-semibold text-center '>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            design by thanhdo
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default DsExamsMiner
