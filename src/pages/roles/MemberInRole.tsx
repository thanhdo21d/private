// import React from 'react'
// import { useParams } from 'react-router'
// import { useGetIdRolesQuery } from '~/apis/roles/roles.api'

// const MemberInRole = () => {
//   const { id } = useParams<{ id: string }>()
//   const { data } = useGetIdRolesQuery(id || '')
//   console.log(data)
//   return <div>MemberInRole</div>
// }

// export default MemberInRole
import { SearchOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Button, Input, Pagination, Space, Table } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { useParams } from 'react-router'
import { useGetIdRolesQuery } from '~/apis/roles/roles.api'
import { Footer } from 'antd/es/layout/layout'

interface DataType {
  key: string
  name: string
  email: string
  avatar: string
  updatedAt: string
  role: string
}

type DataIndex = keyof DataType
const MemberInRole: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const { id } = useParams<{ id: string }>()

  const { data } = useGetIdRolesQuery(id || '')
  console.log(data)
  // const dataTable1 : any = data?data?.users?.map((users : any)=>({
  //   key : users._id,
  // avatar : users.avatar,
  // updatedAt : users.updatedAt,
  // email : users.email,
  // role : users
  // }))
  const dataTable: any = data?.data.users.map((users: any) => ({
    key: users._id,
    avatar: users.avatar,
    updatedAt: users.updatedAt,
    email: users.email,
    name: users.email,
    role: users
  }))

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          className='rounded-md'
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            className='bg-success'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      ...getColumnSearchProps('email'),
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
        const name = text.split('@')
        const userName = name[0].split('.')
        const checkName = userName.pop()
        console.log(checkName)
        return <p className='font-medium text-md'>{userName}</p>
      }
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '20%',
      render: (text) => <img className='w-[50px]' src={`${text}`} />
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
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    //   ...getColumnSearchProps('address'),
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ['descend', 'ascend']
    // }
  ]

  return (
    <div>
      <div className='mt-2'>
        <Table columns={columns} dataSource={dataTable} pagination={false} />
        <div className='mt-5 float-right'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</Footer>
    </div>
  )
}

export default MemberInRole
