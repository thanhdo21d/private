import { DatePicker, Divider, Form, Input, Table } from 'antd'
import React from 'react'
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
      <Breadcrumb pageName='check logs' />
      <Divider orientation='left'>Bộ Lọc</Divider>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, display: 'flex' }}
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
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button styleClass='py-2' type='submit'>Submit</Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </div>
  )
}

export default CheckLog
