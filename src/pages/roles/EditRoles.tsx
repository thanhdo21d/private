import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, Skeleton } from 'antd'
import { Button } from '~/components'
import { useNavigate, useParams } from 'react-router-dom'
import { PiKeyReturnDuotone } from 'react-icons/pi'
import { useAddRoleMutation, useGetIdRolesQuery, useUpdateRoleMutation } from '~/apis/roles/roles.api'
import { IRole } from '~/types/roles/roles.type'
import { toastService } from '~/utils/toask/toaskMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Header } from 'antd/es/layout/layout'
import { useTranslation } from 'react-i18next'
import { useAddTaskRoleMutation, useGetAllTaskRoleQuery, useRemoveTaskRoleMutation } from '~/apis/task/task.api'
import { ItaskRole } from '~/types/task/task.type'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useChangeRoleOtherAdminMutation } from '~/apis/department/department'
import { useGetAllCategoriesQuery } from '~/apis/category/categories'
type FieldType = {
  name?: string
  status?: string
}
const EditRoles: React.FC = () => {
  const { t } = useTranslation(['header'])
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: taskRoleData, isFetching: taskRoleDataFetching } = useGetAllTaskRoleQuery()
  const { data: roleData, isFetching: isGetRoleLoading } = useGetIdRolesQuery(id as string)
  const [addTaskRole] = useAddTaskRoleMutation()
  const [selectedOption, setSelectedOption] = useState('')
  const [updateRoles, { isLoading: isUpdateLoading }] = useUpdateRoleMutation()
  const [addRoles, { isLoading: isAddLoading }] = useAddRoleMutation()
  const [removeLoad] = useRemoveTaskRoleMutation()
  const [changeRoleOtherAmin] = useChangeRoleOtherAdminMutation()
  const { data: dataAllCategories } = useGetAllCategoriesQuery()
  const OPTIONS = dataAllCategories?.data
    ?.filter((items: any) => items.parentCheck !== '0')
    .map((data: any) => ({
      id: data._id,
      name: data.name
    }))
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [selectedItemIds, setSelectedItemIds] = useState<any[]>([])
  const filteredOptions = OPTIONS?.filter((o: any) => !selectedItemIds.includes(o.id))
  const handleSelectChange = (selectedValues: any) => {
    const selectedIds = selectedValues.map((value: any) => OPTIONS.find((option: any) => option.name === value).id)
    setSelectedItems(selectedValues)
    setSelectedItemIds(selectedIds)
  }
  useEffect(() => {
    if (roleData) {
      form.setFieldsValue({
        name: roleData?.data?.name,
        status: roleData?.data?.status
      })
    }
  }, [roleData, form, id])
  useEffect(() => {
    if (roleData) {
      const selectedItems: any[] = []
      roleData?.data.adminDepartMent?.forEach(({ name }) => {
        selectedItems.push(name)
      })
      setSelectedItems(selectedItems)
    }
  }, [roleData])

  const onFinish = (values: IRole) => {
    if (id) {
      // truong hop update
      updateRoles({ ...values, _id: id })
        .unwrap()
        .then(() => {
          if (selectedOption.split('_')[0] !== 'reject') {
            addTaskRole({
              id: id as string,
              body: [selectedOption.split('_')[1]]
            })
          } else {
            removeLoad({
              id: id as string,
              body: [selectedOption.split('_')[1]]
            })
          }
          toastService.success('Roles updated successfully')
          setTimeout(() => {
            window.location.reload()
          }, 450)
        })
        .catch(() => toastService.error('Error updating roles'))
      changeRoleOtherAmin({
        id: id,
        body: selectedItemIds
      })
        .unwrap()
        .then(() => {
          console.log('ok')
        })
    } else {
      // truong hop them moi
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
  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value)
    console.log(event.target.value.split('_'))
  }
  return (
    <>
      <Button styleClass='bg-strokedark font-bold hover:bg-warning' onClick={() => navigate('/admin/roles')}>
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
              <Input className='w-full rounded-md border border-bodydark' placeholder='vui lòng nhập tên roles .....' />
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
              <div>
                {taskRoleDataFetching ? (
                  <div>
                    {' '}
                    <Skeleton /> <Skeleton /> <Skeleton /> <Skeleton />
                  </div>
                ) : (
                  <div className='grid grid-cols-4 gap-5 mt-5'>
                    {taskRoleData?.data.map(({ _id, task }: { _id: string; task: string }) => {
                      const checkData = roleData?.data.tasks.some((data: any) => data._id.includes(_id))
                      return (
                        <div
                          className='w-full border border-secondary	 rounded-md shadow-xl text-xl font-medium '
                          key={_id}
                        >
                          <p onClick={() => console.log(_id)} className='pl-4 flex  gap-2 items-center'>
                            <span>
                              <MdOutlineAddCircleOutline />
                            </span>
                            <span>{task}</span>{' '}
                          </p>
                          <div className='ml-5 mt-1 '>
                            <input
                              type='radio'
                              id={`inputAllow_${_id}`}
                              name='selection'
                              value={`allow_${_id}`}
                              checked={selectedOption === `allow_${_id}`}
                              onChange={handleOptionChange}
                              className={`cursor-pointer ${checkData === true ? 'bg-success' : ''}`}
                            />
                            <label
                              className='pl-5 cursor-pointer text-success !text-xl font-semibold'
                              htmlFor={`inputAllow_${_id}`}
                            >
                              Cho Phép
                            </label>
                          </div>
                          <div className='ml-5 mt-1 mb-1 '>
                            <input
                              type='radio'
                              id={`inputReject_${_id}`}
                              name='selection'
                              value={`reject_${_id}`}
                              checked={selectedOption === `reject_${_id}`}
                              onChange={handleOptionChange}
                              className='cursor-pointer'
                            />
                            <label
                              className='pl-5 text-danger !text-xl cursor-pointer font-semibold'
                              htmlFor={`inputReject_${_id}`}
                            >
                              Từ Chối
                            </label>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            {/* other admin  */}
            <div>
              <div className='w-full h-[65px] flex items-center bg-graydark mt-5'>
                <p className='text-2xl font-medium text-white text-left pl-5'>Phân quyền other admin</p>
              </div>

              <div className='mt-10'>
                <Select
                  mode='multiple'
                  placeholder='Inserted are removed'
                  value={selectedItems}
                  onChange={handleSelectChange}
                  style={{ width: '100%', height: '50px', paddingLeft: '10px' }}
                  options={filteredOptions?.map((item: any) => ({
                    value: item.name,
                    label: item.name
                  }))}
                />
              </div>
            </div>
            <Form.Item className='mt-10' wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='submit'>
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
