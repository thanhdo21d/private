import { SearchOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Form, Input, Space, Table } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import { useParams } from 'react-router'
import { useGetIdRolesQuery } from '~/apis/roles/roles.api'
import { Footer } from 'antd/es/layout/layout'
import Pagination from './Pagination'
import { Button } from '~/components'
import { createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
interface DataType {
  key: string
  name: string
  email: string
  avatar: string
  updatedAt: string
  role: string
}
const MemberInRole: React.FC = () => {
  
  const [queryParameters] = useSearchParams()
  const search: string | null = queryParameters.get('search')
  const uri = import.meta.env.VITE_API
  const { id } = useParams<{ id: string }>()
  const { data } = useGetIdRolesQuery({
    id: id as string,
    search: search as string
  })
  const queryConfig = useQueryConfig()
  const dataTable: any = data?.data.users.map((users: any) => ({
    key: users._id,
    avatar: users.avatar,
    updatedAt: users.updatedAt,
    email: users.email,
    name: users.username,
    code: users.employeeCode
  }))
  const navigate = useNavigate()
  const columns: ColumnsType<DataType> = [
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      render: (text) => {
        return <p className='font-medium text-md'>{text}</p>
      }
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      render: (text) => {
        return <p className='font-medium text-danger text-md'>{text}</p>
      }
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text) => {
        return <p className='font-medium text-md'>{text}</p>
      }
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '20%',
      render: (text) => <img className='w-[50px]' src={`${uri}${text}`} />
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: '20%',
      render: (text) => {
        const textNum = text.split('T')[0]
        console.log(textNum)
        return <p className='font-medium text-md'>{textNum}</p>
      }
    }
  ]
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
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  return (
    <div>
      <div className='mt-10 flex gap-5'>
        <Form className='flex gap-5  justify-center' onFinishFailed={onFinishFailed} onFinish={onFinish}>
          <Form.Item name='keyword' rules={[{ required: true, message: 'Please input your code!' }]}>
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
      <div className='mt-2'>
        <Table columns={columns} dataSource={dataTable} pagination={false} />
        <div className='mt-5 float-right'></div>
      </div>
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</Footer>
    </div>
  )
}

export default MemberInRole
