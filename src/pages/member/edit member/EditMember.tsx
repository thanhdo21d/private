import React, { useEffect, useState } from 'react'
import { Checkbox, Form, Input, Select, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useParams } from 'react-router'
import { useGetIdUserQuery } from '~/apis/user/user.api'
import { useGetAllRolesQuery, useUpdateRoleMutation } from '~/apis/roles/roles.api'
import { useUpdateRoleUserMutation } from '~/apis/roles/changeRoleUser'

type FieldType = {
  username?: string
  roles?: string
}
const EditMember: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data: dataMember,
    isFetching: isGetrolesLoading,
    isSuccess: isSuccessGEtROle
  } = useGetIdUserQuery(id as string)
  const { data: dataRoles } = useGetAllRolesQuery()
  const [updateRoleUser, { isSuccess }] = useUpdateRoleUserMutation()
  const [idRoleUser, setIdRoleUser] = useState<string>('')
  console.log(dataMember, 'data users')
  const [form] = Form.useForm()
  console.log(isSuccessGEtROle)
  useEffect(() => {
    if (dataMember) {
      setIdRoleUser(dataMember?.user?.role?._id)
    }
    form.setFieldsValue({
      username: dataMember?.user.email,
      roles: dataMember?.user.role.name
    })
  }, [id, dataMember, form])
  const onFinish = (values: any) => {
    // updateRoleUser({ ...values, id, idRoleUser })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div>
      {isGetrolesLoading && <Skeleton />}
      {isSuccessGEtROle && (
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
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
          <Form.Item<FieldType> name='roles' label='Roles'>
            <Select>
              {dataRoles?.data?.map((dataROle: any, index: number) => {
                return (
                  <Select.Option key={index} value={`${dataROle.name}`}>
                    {dataROle.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default EditMember
