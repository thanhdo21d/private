import React from 'react'
import { Input, Pagination, Popconfirm, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import { useGetAllUserQuery } from '~/apis/user/user.api'
const AllMember = () => {
  const navigate = useNavigate()
  const confirm = (id: number | string) => {
    console.log(id)
  }
  const { data } = useGetAllUserQuery()
  console.log(data)
  const dataSource = data?.docs.map((item: any) => ({
    key: item._id,
    name: item.email,
    avatar: item.avatar,
    users: item.code,
    update: item.updatedAt,
    gender: item.gender,
    email: item.email,
    department: item.Department
  }))
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        const name = text.split('@')
        const userName = name[0].split('.')
        const checkName = userName.pop()
        console.log(checkName)
        return <a className='text-md font-bold'>{userName}</a>
      }
    },
    {
      title: 'Phòng Ban',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => <a className='text-md font-bold'>{text}</a>
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',

      key: 'age',
      render: (text: string) => <img className='text-md w-[50px] font-bold' src={`${text}`} />
    },
    {
      title: 'code',
      dataIndex: 'users',
      key: 'users',
      render: (text: string) => <a className='text-danger font-bold'>{text}</a>
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'update',
      key: 'update',
      render: (text: string) => {
        const date = text.split('T')[0]
        return <a className='text-md font-normal'>{date}</a>
      }
    },
    {
      title: 'giới tính',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Tác Vụ',
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
            <Link to={`/admin/member/${id}/edit`}>Sửa</Link>
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
