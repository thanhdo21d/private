import React, { useEffect } from 'react'
import { Form, Input, Radio, Skeleton } from 'antd'
import { Button } from '~/components'
import { useNavigate, useParams } from 'react-router-dom'
import { PiKeyReturnDuotone } from 'react-icons/pi'
import { useAddRoleMutation, useGetIdRolesQuery, useUpdateRoleMutation } from '~/apis/roles/roles.api'
import { IRole } from '~/types/roles/roles.type'
import { toastService } from '~/utils/toask/toaskMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

type FieldType = {
  name?: string
  status?: string
}
const EditRoles: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: roleData, error, isFetching: isGetRoleLoading } = useGetIdRolesQuery(id || '')
  const [updateRoles, { isLoading: isUpdateLoading }] = useUpdateRoleMutation()
  const [addRoles, { isLoading: isAddLoading }] = useAddRoleMutation()
  useEffect(() => {
    // đồng bộ dữ liệu từ API fill vào form
    form.setFieldsValue({
      name: roleData?.data?.name,
      status: roleData?.data?.status
    })
  }, [roleData, form, id])
  const onFinish = (values: IRole) => {
    console.log(values)
    if (id) {
      updateRoles({ ...values, _id: id })
        .unwrap()
        .then(() => {
          toastService.success('Roles updated successfully')
          navigate('/admin/roles')
        })
        .catch(() => toastService.error('Error updating roles'))
    } else {
      addRoles(values)
        .unwrap()
        .then(() => {
          toastService.success('Roles added successfully')
          navigate('/admin/roles')
        })
        .catch(() => toastService.error('Error adding roles'))
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const textButton = id ? 'Sửa Roles' : 'Thêm Roles'
  return (
    <>
      <Button styleClass='bg-strokedark font-bold' onClick={() => navigate('/admin/roles')}>
        Quay Lại{' '}
        <span>
          {' '}
          <PiKeyReturnDuotone />
        </span>
      </Button>
      {isGetRoleLoading ? (
        <Skeleton />
      ) : (
        <div className='mx-auto w-[900px] mt-20'>
          <Form
            form={form}
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
              label='Roles'
              name='name'
              rules={[{ required: true, message: 'Please input your Roles!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label='Trạng Thái'
              name='status'
              rules={[{ required: true, message: 'Please checked  !' }]}
            >
              <Radio.Group>
                <Radio value='active'> active </Radio>
                <Radio value='inactive'> inactive </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='submit'>
                {' '}
                {isUpdateLoading || isAddLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : textButton}
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  )
}

export default EditRoles
