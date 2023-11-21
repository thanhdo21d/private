import { Form, Input, Popconfirm, Skeleton, Table, Tooltip } from 'antd'
import { Link, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import { AiFillEdit, AiOutlineLoading3Quarters, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { useDeleteRoleMutation, useGetAllRolesQuery, useSearchRoleApiGETQuery } from '~/apis/roles/roles.api'
import { IRole } from '~/types/roles/roles.type'
import { toastService } from '~/utils/toask/toaskMessage'
import { useEffect, useState } from 'react'
import { Footer } from 'antd/es/layout/layout'
import Pagination from './Pagination'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import { FcViewDetails } from 'react-icons/fc'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
type FieldType = {
  keyword?: string
}
const Roles = () => {
  const [removeRoles, { isLoading }] = useDeleteRoleMutation()
  const [queryParameters] = useSearchParams()
  const dataSearchQuery: string | null = queryParameters.get('content')
  const dataSortQuery: string | null = queryParameters.get('sort')
  const queryConfig = useQueryConfig()
  const dataPageQuery: string | null = queryParameters.get('page')
  const { data: dataGetRole } = useSearchRoleApiGETQuery(dataSearchQuery)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const navigate = useNavigate()
  const confirm = (id: string) => {
    removeRoles(id)
      .unwrap()
      .then(() => toastService.success('Xóa thành công'))
      .catch(() => toastService.error('Xóa thất bại'))
  }
  const { data, isFetching } = useGetAllRolesQuery({
    sort: dataSortQuery === 'updateAt' ? dataSortQuery : '',
    page: dataPageQuery || 1
  })
  useEffect(() => {
    if (data) {
      setSearchResults(data)
    }
    if (dataGetRole?.data.length != 0) {
      setSearchResults(dataGetRole)
    }
  }, [data, searchResults, dataGetRole])
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    navigate({
      search: createSearchParams({
        content: keywordSpace
      }).toString()
    })
    if (dataGetRole) setSearchResults(dataGetRole)
  }
  const onFinishFailed = () => {
    navigate({
      search: createSearchParams({
        content: ''
      }).toString()
    })
  }
  const dataSource = searchResults?.data?.map((item: IRole) => {
    return {
      key: item._id,
      name: item.name,
      status: item.status,
      users: item.users,
      update: item.updatedAt
    }
  })
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
        console.log(text)
        const color = text == 'active' ? 'text-success' : 'text-danger'
        return <a className={`text-[18px] ${color} font-bold pl-3`}>{text}</a>
      }
    },
    {
      title: (
        <p
          onClick={() => {
            if (dataSortQuery == null || dataSortQuery == '') {
              navigate({
                search: createSearchParams({
                  sort: 'updateAt'
                }).toString()
              })
            } else {
              navigate({
                search: createSearchParams({
                  sort: ''
                }).toString()
              })
            }
          }}
          className='text-danger flex gap-2 items-center text-center justify-center font-semibold text-md cursor-pointer'
        >
          <span>
            {' '}
            <Tooltip title='Sắp xếp theo ngày sửa'>Ngày sửa</Tooltip>{' '}
          </span>{' '}
          <span>
            {dataSortQuery == null || dataSortQuery == '' ? (
              <AiOutlineSortAscending className='text-2xl' />
            ) : (
              <AiOutlineSortDescending className='text-2xl' />
            )}
          </span>
        </p>
      ),
      dataIndex: 'update',
      key: 'update',
      render: (text: string) => {
        const check = text.split('T')
        const checkTime = check[1].split('.')
        const date = text.split('T')[0]

        return (
          <p className='text-md flex text-center items-center gap-5 justify-center font-medium'>
            <span className='font-bold'>{date}</span> <span>{checkTime[0]}</span>
          </p>
        )
      }
    },
    {
      title: <p className='flex gap-2 items-center text-center justify-center font-bold text-md '>Tác vụ</p>,
      render: ({ key: _id }: { key: string }) => (
        <div className='flex justify-center space-x-2'>
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
            <Button styleClass='bg-danger flex items-center  w-[80px] xl:w-[100px]'>
              <span>
                <DeleteIcon />
              </span>
              <span> {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Xóa'}</span>
            </Button>
          </Popconfirm>
          <Button
            styleClass='flex items-center w-[80px] xl:w-[100px]'
            onClick={() => navigate(`/admin/roles/edit/${_id}`)}
          >
            <span>
              <AiFillEdit />
            </span>
            <Link to={`/admin/roles/edit/${_id}`}>Sửa</Link>
          </Button>
          <Button
            onClick={() => navigate(`/admin/roles/${_id}/memRole`)}
            styleClass='bg-warning flex items-center w-[80px] xl:w-[120px] !px-0'
          >
            <span>
              <FcViewDetails />
            </span>
            <Link to={`/admin/roles/${_id}/memRole`}>Chi Tiết</Link>
          </Button>
        </div>
      )
    }
  ]
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
            <Input
              className='h-[50px] w-[500px] xl:w-[600px] border border-[#ccc]'
              placeholder='Tìm Kiếm Theo Roles ....'
            />
          </Form.Item>
          <Button type='submit' id='keycode13' styleClass='w-[150px] h-[50px] bg-graydark'>
            Tìm Kiếm
          </Button>
        </Form>
      </div>
      <div className='mt-2'>
        {isFetching ? <Skeleton /> : <Table dataSource={dataSource} pagination={false} columns={columns} />}
        <Footer className='mt-5 flex justify-between'>
          <div className='text-md font-semibold text-center'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div>
            <Pagination pageSize={data?.totalPages} queryConfig={queryConfig} />
          </div>
        </Footer>
      </div>
    </div>
  )
}
export default Roles
