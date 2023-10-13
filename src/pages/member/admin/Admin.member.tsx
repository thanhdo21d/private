import React from 'react'
import { Checkbox, Form, Input, Upload } from 'antd'
import { Button } from '~/components'
import { UserOutlined } from '@ant-design/icons'

const onFinish = (values: any) => {
  console.log('Success:', values)
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e
  }
  return e?.fileList
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

type FieldType = {
  username?: string
  password?: string
  remember?: string
}
const AddMember: React.FC = () => (
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
      <Input size='large' prefix={<UserOutlined />} />
    </Form.Item>

    <Form.Item<FieldType>
      label='Password'
      name='password'
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label='Upload' valuePropName='fileList' getValueFromEvent={normFile}>
      <Upload action='/upload.do' listType='picture-card'>
        <div>
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type='submit' styleClass='bg-primary h-[40px]'>
        Submit
      </Button>
    </Form.Item>
  </Form>
)

export default AddMember
