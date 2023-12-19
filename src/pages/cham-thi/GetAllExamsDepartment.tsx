import { Button, Divider, Table } from 'antd'
import React from 'react'

const GetAllExamsDepartment = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: <p className='flex justify-center'>tác vụ</p>,
      render: () => {
        return (
          <div className='flex justify-center'>
            <Button>chi tiết</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <div className='mb-5'>
        <Divider orientation='left'>Danh sách bài thi </Divider>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  )
}

export default GetAllExamsDepartment
