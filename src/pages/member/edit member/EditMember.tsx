import React from 'react'
import { Checkbox, Form, Input, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useParams } from 'react-router'
import { useGetIdUserQuery } from '~/apis/user/user.api'

type FieldType = {
  username?: string
  roles?: string
}
const EditMember: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetIdUserQuery(id || '')
  console.log(data)
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder='userName' prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item<FieldType> name="roles" label='Roles'>
        <Select>
          <Select.Option value='demo'>Demo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='submit'>Submit</Button>
      </Form.Item>
    </Form>
  )
}

export default EditMember
