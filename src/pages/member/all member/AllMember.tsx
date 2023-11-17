import React from 'react'
import { Input, Popconfirm, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmailIcon } from '~/components'
import { useDeleteUserMutation, useGetAllUserQuery } from '~/apis/user/user.api'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import { AiFillEdit } from 'react-icons/ai'
import { toastService } from '~/utils/toask/toaskMessage'
import Pagination from '~/pages/roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
const AllMember = () => {
  const navigate = useNavigate()
  const [removeMember, { isLoading }] = useDeleteUserMutation()
  const queryConfig = useQueryConfig()
  const confirm = (id: string) => {
    removeMember(id)
      .unwrap()
      .then(() => toastService.success('remove member successfully'))
      .catch(() => toastService.error('error removing member'))
  }
  const { data } = useGetAllUserQuery()
  console.log(data)
  const dataSource = data?.docs.map((item: any) => ({
    key: item._id,
    name: item.username,
    avatar: item.avatar,
    users: item.code,
    update: item.updatedAt,
    gender: item.gender,
    email: item.email,
    role: item.role,
    department: item.Department
  }))
  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        return <a className='text-md font-bold'>{text}</a>
      }
    },
    {
      title: 'Chức Vụ',
      dataIndex: 'role',
      key: 'role',
      render: (text: { name: string }) => {
        // const name = text.split('@')
        // const userName = name[0].split('.')
        // const checkName = userName.pop()
        return <a className='text-md font-bold'>{text.name}</a>
      }
    },
    {
      title: 'Phòng Ban',
      dataIndex: 'department',
      key: 'department',
      render: (text: string) => <a className='text-md pl-5 font-bold'>{text}</a>
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
      title: <p className='flex justify-center'>Email</p>,
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <a className='text-danger font-bold'>{text}</a>
    },
    {
      title: <p className='flex justify-center'>Tác Vụ</p>,
      render: ({ key: id }: { key: string }) => (
        <div className=' 2xl:flex grid grid-cols-1 gap-2'>
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
            <Button styleClass='bg-danger flex items-center  w-[80px] xl:w-[100px]'>
              <span>
                <DeleteIcon />
              </span>
              <span className='font-medium'> Xóa</span>
            </Button>
          </Popconfirm>
          <Button
            styleClass='flex items-center w-[80px] xl:w-[100px]'
            onClick={() => navigate(`/admin/member/${id}/edit`)}
          >
            <span>
              <AiFillEdit />
            </span>
            <span>Sửa</span>
          </Button>
          <Button styleClass='flex items-center  w-[80px] xl:w-[100px]'>
            <span>
              <EmailIcon />
            </span>
            <span>Mailer</span>
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
          <div>
            <Pagination pageSize={data?.totalPages} queryConfig={queryConfig} />
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 text-center'>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</div>
    </div>
  )
}
export default AllMember
