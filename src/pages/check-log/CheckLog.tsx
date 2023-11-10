import { DatePicker, Divider, Form, Input, Table } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from '~/components'
const CheckLog = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }
  const onDateChange = (_, dateString) => {}
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
      title: 'ID',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'LogType',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Contents',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Author',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'IP Computer',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'address',
      key: 'address'
    }
  ]

  return (
    <div>
      <Breadcrumb pageName='check logs' />
      <Divider orientation='left'>Bộ Lọc</Divider>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 900, display: 'flex', justifyContent: 'space-between' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item label='ngày'>
          <DatePicker.RangePicker onChange={onDateChange} />
        </Form.Item>
        <Form.Item<FieldType>
          label='Author Code'
          name='password'
          rules={[{ required: true, message: 'Please input your Author Code!' }]}
        >
          <Input placeholder='Author Code' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button styleClass='py-2' type='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation='left'></Divider>
      <Table className='mt-5' dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  )
}

export default CheckLog
