import { SearchOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Button, Input, Pagination, Space, Table } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { Link } from 'react-router-dom'
import { Footer } from 'antd/es/layout/layout'
interface DataType {
  key: string
  name: string
  code: number
  address: string
}
type DataIndex = keyof DataType
const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    code: 32,
    address: '10/09/2023'
  },
  {
    key: '2',
    name: 'Joe Black',
    code: 42,
    address: '10/08/2022'
  },
  {
    key: '3',
    name: 'Jim Green',
    code: 32,
    address: '10/04/2021'
  },
  {
    key: '4',
    name: 'Jim Red',
    code: 32,
    address: '10/01/2021'
  }
]
const InfoResult: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
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
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
            className='bg-blue23'
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code',
      width: '20%',
      ...getColumnSearchProps('code'),
      render: (text: string) => <a className='text-md font-bold'>{text}</a>
    },
    {
      title: 'Ngày thi',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
      render: (text: string) => <a className='text-md font-bold'>{text}</a>
    },
    {
      title: 'Hành Động',
      render: ({ key: id }: { key: number | string }) => (
        <div className=''>
          <Button className='bg-blue23 font-medium text-white text-md'>
            <Link to={`/user-info/ket-qua-thi/${id}`}>Chi Tiết Bài Thi</Link>
          </Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <div className='mt-10 flex gap-5'>
        <Input className='h-[50px] w-[600px] rounded-md' placeholder='Nhập từ khóa tìm kiếm ....' />
        <Button className='w-[150px] h-[50px] bg-graydark text-white text-md font-medium'>Tìm Kiếm</Button>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        <Table columns={columns} dataSource={data} pagination={false} />
        <div className='mt-5 float-right'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <Footer style={{ textAlign: 'center' }}>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</Footer>
    </div>
  )
}
export default InfoResult
