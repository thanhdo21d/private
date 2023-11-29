import React from 'react'
import { Form, Input, Popconfirm, Table } from 'antd'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, EmailIcon } from '~/components'
import { useDeleteUserMutation, useGetAllUserQuery } from '~/apis/user/user.api'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import { AiFillEdit } from 'react-icons/ai'
import { toastService } from '~/utils/toask/toaskMessage'
import Pagination from '~/pages/roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import { Footer } from 'antd/es/layout/layout'
type FieldType = {
  keyword?: string
}
const AllMember = () => {
  const navigate = useNavigate()
  const [removeMember, { isLoading }] = useDeleteUserMutation()
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const uri = import.meta.env.VITE_API
  const queryConfig = useQueryConfig()
  const confirm = (id: string) => {
    removeMember(id)
      .unwrap()
      .then(() => toastService.success('remove member successfully'))
      .catch(() => toastService.error('error removing member'))
  }
  const { data } = useGetAllUserQuery({
    limit: datalimitQueryChange || 20,
    page: dataPageQuery || 1,
    employeeCode: search || ''
  })
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: keywordSpace
      }).toString()
    })
  }
  const dataSource = data?.docs?.map((item: any) => ({
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
      title: 'code',
      dataIndex: 'users',
      key: 'users',
      render: (text: string) => <a className='text-danger font-bold'>{text}</a>
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        return <a className='text-md font-bold'>{text ? text : ''}</a>
      }
    },
    {
      title: 'Chức Vụ',
      dataIndex: 'role',
      key: 'role',
      render: (text: { name: string }) => {
        return <a className='text-md font-bold'>{text?.name}</a>
      }
    },
    {
      title: 'Ảnh',
      dataIndex: 'avatar',

      key: 'age',
      render: (text: string) => <img className='text-md w-[50px] font-bold' src={`${uri}${text}`} />
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
        </div>
      )
    }
  ]
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  return (
    <div className=''>
      <div className='mt-10 flex gap-5'>
        <Form className='flex gap-5  justify-center' onFinishFailed={onFinishFailed} onFinish={onFinish}>
          <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your code!' }]}>
            <Input
              className='h-[40px] w-[500px] xl:w-[600px] border border-[#ccc]'
              placeholder='Tìm Kiếm Theo code ....'
            />
          </Form.Item>
          <Button type='submit' styleClass='w-[150px] h-[40px] bg-graydark'>
            Tìm Kiếm
          </Button>
        </Form>
      </div>
      <hr className='mt-5 ' />
      <div className='mt-2 '>
        <Table className='' dataSource={dataSource} pagination={false} columns={columns} />
      </div>
      <Footer className='mt-5 2xl:flex justify-between dark:bg-black '>
        <div className='text-md font-semibold text-center dark:text-white'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
        <div>
          <Pagination pageSize={data?.totalPages} queryConfig={queryConfig} />
        </div>
      </Footer>
    </div>
  )
}
export default AllMember
