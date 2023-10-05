import React from 'react'
import { Input, Pagination, Popconfirm, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import { Footer } from 'antd/es/layout/layout'
const InfoResult = () => {
  const navigate = useNavigate()
  const confirm = (id: number | string) => {}
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
    },
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
    },
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
    },
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
    },
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
    },
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
      title: 'Tên Kì Thi',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Code',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Nhân Viên Phòng',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Ngày Thi',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Điểm Thi',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: id }: { key: number | string }) => (
        <div className=''>
          <Button>
            <Link to={`/user-info/ket-qua-thi/${id}`}>Chi Tiết Bài Thi</Link>
          </Button>
        </div>
      )
    }
  ]
  //dmvn 972524 dovt
  return (
    <div> 
      <div className='mt-10 flex gap-5'>
        <Input className='h-[50px] w-[600px] rounded-md' placeholder='Nhập từ khóa tìm kiếm ....' /> 
        <Button styleClass='w-[150px] h-[50px] bg-graydark'>Tìm Kiếm</Button>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        <Table dataSource={dataSource} pagination={false} columns={columns} />
        <div className='mt-5 float-right'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</Footer>
    </div>
  )
}
export default InfoResult
