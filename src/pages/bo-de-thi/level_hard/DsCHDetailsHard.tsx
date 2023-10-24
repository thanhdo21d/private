import { Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import Pagination from '~/pages/roles/Pagination'

const DsCHDetailsHard = () => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    }
  ]

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Footer className='mt-5 flex justify-between'>
        <div className='text-md font-semibold text-center'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
        <div>
          <Pagination pageSize={2} />
        </div>
      </Footer>
    </div>
  )
}

export default DsCHDetailsHard
