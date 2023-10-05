import React from 'react'
import { Input, Pagination, Popconfirm, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components'
const AllMember = () => {
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
    }
  ]

  const columns = [
    {
      title: 'Tiêu Đề',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Người Dùng',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tác vụ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      render: ({ key: id }: { key: number | string }) => (
        <div className='flex space-x-2'>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            onConfirm={() => confirm(id)}
            okText='Yes'
            okButtonProps={{
              style: { backgroundColor: 'blue' }
            }}
            cancelText='No'
            placement='rightBottom'
          >
            <Button styleClass='bg-danger '>Xóa</Button>
          </Popconfirm>
          <Button>
            <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
          </Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <Button styleClass='bg-warning' onClick={() => navigate('/admin/all-member/add')}>
        Thêm mới
      </Button>
      <div className='mt-10 flex gap-5'>
        <Input className='h-[50px] w-[600px]' placeholder='Tìm Kiếm Theo Code ....' />
        <Button styleClass='w-[150px] h-[50px] bg-graydark'>Tìm Kiếm</Button>
      </div>
      <hr className='mt-5' />

      <div className='mt-2'>
        <Table dataSource={dataSource} pagination={false} columns={columns} />
        <div className='mt-5 float-right'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <div className='absolute bottom-0 text-center'>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</div>
    </div>
  )
}

export default AllMember
