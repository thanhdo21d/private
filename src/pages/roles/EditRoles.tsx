import React, { useEffect } from 'react'
import { Form, Input, Radio, Skeleton } from 'antd'
import { Button } from '~/components'
import { useNavigate, useParams } from 'react-router-dom'
import { PiKeyReturnDuotone } from 'react-icons/pi'
import { useAddRoleMutation, useGetIdRolesQuery, useUpdateRoleMutation } from '~/apis/roles/roles.api'
import { IRole } from '~/types/roles/roles.type'
import { toastService } from '~/utils/toask/toaskMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Header } from 'antd/es/layout/layout'
import { useTranslation } from 'react-i18next'
type FieldType = {
  name?: string
  status?: string
}
const EditRoles: React.FC = () => {
  const { t } = useTranslation(['header'])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: roleData, error, isFetching: isGetRoleLoading } = useGetIdRolesQuery(id as string)
  const [updateRoles, { isLoading: isUpdateLoading }] = useUpdateRoleMutation()
  const [addRoles, { isLoading: isAddLoading }] = useAddRoleMutation()
  console.log(roleData?.data?.name)
  useEffect(() => {
    // đồng bộ dữ liệu từ API fill vào form
    if (roleData) {
      form.setFieldsValue({
        name: roleData?.data?.name,
        status: roleData?.data?.status
      })
    }
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
      {id && isGetRoleLoading ? (
        <Skeleton />
      ) : (
        <div className=' mx-auto w-full mt-20'>
          <Form
            form={form}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <p className='font-semibold text-xl mb-3'>Tiêu Đề</p>
            <Form.Item<FieldType>
              name='name'
              className='w-full'
              rules={[{ required: true, message: 'Please input your Roles!' }]}
            >
              <Input className='w-full' />
            </Form.Item>
            <p className='font-semibold text-xl mb-3'>Trạng Thái</p>
            <Form.Item<FieldType> name='status' rules={[{ required: true, message: 'Please checked  !' }]}>
              <Radio.Group className='my-3'>
                <Radio className='text-xl' value='active'>
                  {' '}
                  <span className='text-2xl font-extralight'>{t('product.active_role')}</span>{' '}
                </Radio>
                <Radio value='inactive'>
                  <span className='text-2xl font-extralight'>{t('product.active_role_no')}</span>
                </Radio>
              </Radio.Group>
            </Form.Item>

            <div>
              <div className='w-full h-[65px] flex items-center bg-graydark'>
                <p className='text-2xl font-medium text-white text-left pl-5'>Phân quyền</p>
              </div>
            </div>
            <Form.Item className='mt-10' wrapperCol={{ offset: 8, span: 16 }}>
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
