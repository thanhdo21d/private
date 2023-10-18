import React, { useEffect } from 'react'
import { Form, Input, Select, Skeleton } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useParams } from 'react-router'
import { useGetIdUserQuery } from '~/apis/user/user.api'
import { useGetAllRolesQuery } from '~/apis/roles/roles.api'
import { useUpdateRoleUserMutation } from '~/apis/roles/changeRoleUser'
import { toastService } from '~/utils/toask/toaskMessage'
import { useNavigate } from 'react-router-dom'
type FieldType = {
  username?: string
  roles?: string
}
const EditMember: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const {
    data: dataMember,
    isFetching: isGetrolesLoading,
    isSuccess: isSuccessGEtROle
  } = useGetIdUserQuery(id as string)
  const { data: dataRoles } = useGetAllRolesQuery({
    sort: '',
    page: 1
  })
  const [updateRoleUser, { isError }] = useUpdateRoleUserMutation()
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      username: dataMember?.user.email,
      roles: dataMember?.user.role.name
    })
  }, [id, dataMember, form])
  const onFinish = (values: any) => {
    updateRoleUser({ ...values, idUser: id as string, idRole: values.roles as string })
      .unwrap()
      .then(() => toastService.success('Role updated successfully'))
      .then(() => navigate('/admin/all-member'))
    if (isError) {
      toastService.error('Error updating role')
    }
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
              {dataRoles?.data?.map((dataROle: any) => {
                return (
                  <Select.Option key={dataROle?._id} value={`${dataROle._id}`}>
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
