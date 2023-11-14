import React, { useState } from 'react'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import checkIcons from '../../../assets/check.png'
import unCheckIcons from '../../../assets/unchecked.png'
import { Button } from '~/components'
import { DatePicker, Divider, Drawer, Empty, Input, InputNumber, Space, Table, Tag } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useNavigate } from 'react-router-dom'
interface DataType {
  key: React.Key
  firstName: string
  lastName: string
  age: number
  address: string
  tags: string[]
}
const DetailsExamsQuestion = () => {
  const { Column, ColumnGroup } = Table
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
  }
  const navigate = useNavigate()

  const data: DataType[] = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    },
    {
      key: '4',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '5',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '6',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]
  return (
    <div>
      <>
        <div className=' mt-15 justify-center items-center w-1/6'>
          <Button onClick={() => navigate(-1)} styleClass='py-2 w-2/3 bg-[#24A19C]'>
            Quay Lại
          </Button>
        </div>
        <Divider orientation='left'>Chi Tiết Đề Thi</Divider>
        <div>
          <div className='flex gap-10'>
            <div>
              <p>Kì Thi</p>
              <Input
                className='h-[32px] border mt-2 border-[#d9d9d9]  w-[400px] rounded-md'
                size='large'
                placeholder='large size'
              />
            </div>
            <div>
              <p> Hiệu lực trong</p>
              <DatePicker.RangePicker className='mt-2' onChange={onDateChange} />
            </div>
            <div>
              <p>Thời Gian </p>
              <InputNumber className='h-[32px] mt-2 rounded-md' size='large' />
            </div>
          </div>

          <div className='mt-10'>
            <p>Tên Bài Thi</p>
            <Input
              className='h-[32px] border mt-2 border-[#d9d9d9]  w-full rounded-md'
              size='large'
              placeholder='large size'
            />
          </div>

          <div className='border-b border-[#d9d9d9] mb-5'>
            <Divider orientation='left' plain>
              <p> Câu Hỏi</p>
            </Divider>
            <div className='flex w-full justify-center'>
              <Table className='w-full' dataSource={data}>
                <ColumnGroup title={<p className='border-b border-[#ccc]'>questions</p>}>
                  <Column title='Câu Hỏi' dataIndex='firstName' key='firstName' />
                  <Column title='Ảnh' dataIndex='lastName' key='lastName' />
                </ColumnGroup>
                <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án</p>}>
                  <Column title='A' dataIndex='firstName' key='firstName' />
                  <Column title='Ảnh' dataIndex='lastName' key='lastName' />

                  <Column title='B' dataIndex='firstName' key='firstName' />
                  <Column title='Ảnh' dataIndex='lastName' key='lastName' />

                  <Column title='C' dataIndex='firstName' key='firstName' />
                  <Column title='Ảnh' dataIndex='lastName' key='lastName' />

                  <Column title='D' dataIndex='firstName' key='firstName' />
                  <Column title='Ảnh' dataIndex='lastName' key='lastName' />
                </ColumnGroup>
                <Column title='Đáp Án Đúng' dataIndex='address' key='address' />
                <Column title='Điểm Số' dataIndex='address' key='address' />
                <Column
                  title='Action'
                  key='action'
                  render={(_: any, record: DataType) => (
                    <Space size='middle'>
                      <a className='text-success font-medium underline'>edit</a>
                      <a className='text-danger font-medium underline'>Delete</a>
                    </Space>
                  )}
                />
              </Table>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default DetailsExamsQuestion
