import { Form, Input, Pagination, Popconfirm, Skeleton, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useDeleteRoleMutation, useGetAllRolesQuery } from '~/apis/roles/roles.api'
import { IRole, IRoleDocs } from '~/types/roles/roles.type'
import { toastService } from '~/utils/toask/toaskMessage'
import { useState } from 'react'
type FieldType = {
  keyword?: string
}
const Roles = () => {
  const [removeRoles, { isError, isLoading, isSuccess }] = useDeleteRoleMutation()
  const navigate = useNavigate()
  const confirm = (id: string) => {
    removeRoles(id)
      .unwrap()
      .then(() => toastService.success('Xóa thành công'))
      .catch(() => toastService.error('Xóa thất bại'))
  }
  const { data, isFetching } = useGetAllRolesQuery()
  const dataSource = data?.data.map((item: IRole) => ({
    key: item._id,
    name: item.name,
    status: item.status,
    users: item.users,
    update: item.updatedAt
  }))
  const columns = [
    {
      title: 'Tiêu Đề',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a className='text-md font-bold'>{text}</a>
    },
    {
      title: 'Người Dùng',
      dataIndex: 'users',
      key: 'users',
      render: (text: string) => {
        const usersLength = text.length
        return <a className={`text-[16px] pl-8`}>{usersLength}</a>
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        const color = text == 'active' ? 'text-success' : 'text-danger'
        return <a className={`text-[18px] ${color} font-bold pl-3`}>{text}</a>
      }
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
      title: 'Tác vụ',
      render: ({ key: _id }: { key: string }) => (
        <div className='flex space-x-2'>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            onConfirm={() => confirm(_id)}
            okText='Yes'
            okButtonProps={{
              style: { backgroundColor: 'blue' }
            }}
            cancelText='No'
            placement='rightBottom'
          >
            <Button styleClass='bg-danger '>
              {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Xóa'}
            </Button>
          </Popconfirm>
          <Button>
            <Link to={`/admin/roles/${_id}/edit`}>Sửa</Link>
          </Button>
        </div>
      )
    }
  ]
  const onFinish = (values: string) => {
    console.log(values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      <Button onClick={() => navigate('/admin/roles/add')}>Thêm mới roles</Button>

      <div className='mt-10 '>
        <Form
          className='flex gap-5'
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 900 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
            <Input className='h-[50px] w-[600px]' placeholder='Tìm Kiếm Theo Roles ....' />
          </Form.Item>
          <Button type='submit' styleClass='w-[150px] h-[50px] bg-graydark'>
            Tìm Kiếm
          </Button>
        </Form>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        {isFetching ? <Skeleton /> : <Table dataSource={dataSource} pagination={false} columns={columns} />}
        <div className='mt-5 float-right'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <div className='absolute bottom-0 text-center'>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</div>
    </div>
  )
}

export default Roles
