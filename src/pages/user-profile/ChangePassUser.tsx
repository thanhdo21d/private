import { Form, Input, Steps } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '~/components'
const ChangePassUser = () => {
  const description = 'Khai Báo Mật Khẩu .'
  const description2 = 'Nhập Mật Khẩu Cũ  .'
  const description3 = 'Nhập Mật Khẩu Mới  .'
  const description4 = 'Nhập Lại Mật Khẩu Mới  .'

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

  return (
    <div className='mt-10 flex justify-around gap-5'>
      <div>
        <Steps
          direction='vertical'
          current={1}
          items={[
            {
              title: 'Để Thay Đổi Mật Khẩu Bạn Cần Thực Hiện Các Bước Sau Đây .!',
              description
            },
            {
              title: description2
            },
            {
              title: description3
            },
            {
              title: description4
            }
          ]}
        />
      </div>
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
          label='Mật Khẩu Cũ'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input.Password size='large' placeholder='Nhập Mật Khẩu Cũ' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<FieldType>
          label='Mật Khẩu Mới'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='Nhập Mật Khẩu Mới'/>
        </Form.Item>
        <Form.Item<FieldType>
          label='Nhập Lại '
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder='Nhập Lại mật Khẩu'/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ChangePassUser
