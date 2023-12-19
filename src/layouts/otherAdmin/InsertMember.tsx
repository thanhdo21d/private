import { Form, Input, Popconfirm, Table } from 'antd'
import React from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllUserQuery } from '~/apis/user/user.api'
import { useInsertUserDepartMentMutation } from '~/apis/userDepartMent/userDepartment'
import { Button } from '~/components'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
const InsertMember = () => {
  const [queryParameters] = useSearchParams()
  const idCate = localStorage.getItem('idCategories')
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const queryConfig = useQueryConfig()
  const search: string | null = queryParameters.get('member')
  console.log(search, 'day nay')
  const navigate = useNavigate()
  const uri = import.meta.env.VITE_API
  const [inSertMember] = useInsertUserDepartMentMutation()
  const { data } = useGetAllUserQuery({
    limit: datalimitQueryChange || 20,
    page: dataPageQuery || 1,
    employeeCode: search || ''
  })
  console.log(data,"d")
  const confirm = (id: string) => {

    inSertMember({
      id: idCate,
      idUser: id
    })
      .unwrap()
      .then(() => toastService.success('Successfully'))
      .catch((errror) => toastService.error('error'))
  }

  const dataSource = data?.docs.map((item: any) => ({
    key: item._id,
    name: item.username,
    avatar: item.avatar,
    employeeCode: item.employeeCode,
    role: item?.role?.name
  }))
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'code',
      dataIndex: 'employeeCode',
      key: 'employeeCode'
    },
    {
      title: 'role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'role',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (img: string) => {
        return <img className='w-[50px]' src={`${uri}${img}`} />
      }
    },
    {
      title: 'tác vụ',
      render: ({ key: id }: { key: string }) => {
        return (
          <div>
            <Popconfirm
              title='insert user'
              description='thêm user vào phòng'
              onConfirm={() => confirm(id)}
              okText='Yes'
              okButtonProps={{
                style: { backgroundColor: 'blue' }
              }}
              cancelText='No'
              placement='rightBottom'
            >
              <Button styleClass='bg-success'>thêm</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        member: keywordSpace
      }).toString()
    })
  }
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' className='flex items-center gap-5'>
        <div className='w-full flex gap-5 items-center'>
          <Form.Item
            name='keyword'
            className='w-3/4'
            rules={[{ required: true, message: 'vui lòng nhập code nhân viên ...!' }]}
          >
            <Input
              className=' rounded-sm border w-full !border-[#ccc]'
              placeholder='vui lòng nhập code nhân viên ...!'
            />
          </Form.Item>
          <Form.Item className='w-1/4 '>
            <Button type='submit' styleClass='w-full bg-black'>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      {search ? (
        <div>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <div>
            <Pagination pageSize={data?.totalPages} queryConfig={queryConfig} />
          </div>
        </div>
      ) : (
        <div>
          <p>Vui Lòng Nhập Code ...</p>
        </div>
      )}
    </div>
  )
}
export default InsertMember
