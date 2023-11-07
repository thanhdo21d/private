import { Col, Drawer, Form, Input, Row, Space } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import { Button } from '~/components'
import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useCreateExamsDepartmentMutation, useGetAllExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { useNavigate, useParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
const { RangePicker } = DatePicker
const ExamConfiguration = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [createExamsCategories] = useCreateExamsDepartmentMutation()
  const {
    data: dataExamsCategories,
    isLoading: isDataExamsCategoriesLoading,
    isFetching
  } = useGetAllExamsCategoriesQuery(id as string)
  console.log(dataExamsCategories)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: ''
  })
  const onDateChange = (_, dateString) => {
    setFormData((prevState) => ({
      ...prevState,
      startDate: dateString[0],
      endDate: dateString[1]
    }))
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = async ({ name }: { name: string }) => {
    setFormData((prevState) => ({
      ...prevState,
      name: name
    }))
    try {
      console.log(formData)
      await createExamsCategories({
        id: id,
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate
      })
        .unwrap()
        .then(() => toastService.success('Successfully created'))
    } catch (error) {
      toastService.error('Failed to create')
    }
  }
  return (
    <div>
      <Button onClick={showDrawer}>Tạo Kì Thi</Button>
      <Drawer
        title='Cấu Hình Kì Thi'
        width={720}
        onClose={onClose}
        visible={open}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form onFinish={onFinish} layout='vertical' hideRequiredMark>
          {/* Input Component */}
          <Form.Item name='name' label='Tên Kì Thi' rules={[{ required: true, message: 'Vui lòng nhập Tên Kì Thi!' }]}>
            <Input placeholder='Vui lòng nhập Tên Kì Thi!' />
          </Form.Item>
          {/* DatePicker Component */}
          <Form.Item label='Thời Gian Diễn ra kì thi'>
            <DatePicker.RangePicker onChange={onDateChange} />
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>

      <div className='grid grid-cols-3 mt-5 gap-y-5'>
        {dataExamsCategories?.exam?.examsKT?.map((data: any) => (
          <div key={data?._id}>
            <div className=''>
              <div className='max-h-full w-[400px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
                <div className='w-full'>
                  <div className='m-8 my-20 max-w-[400px] mx-auto'>
                    <div className='mb-8'>
                      <div className='text-center animate-bounce mx-auto flex justify-center'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          x='0px'
                          y='0px'
                          width='48'
                          height='48'
                          viewBox='0 0 48 48'
                        >
                          <path
                            fill='#4caf50'
                            d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
                          ></path>
                          <path
                            fill='#ccff90'
                            d='M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z'
                          ></path>
                        </svg>
                      </div>
                      <p className='text-gray-600 text-center'>{data?.name}.</p>
                    </div>
                    <div className='mt-5 mx-auto grid gap-y-4 '>
                      <div className='flex justify-center'>
                        <button
                          // onClick={() => navigate(`/tree-menu/${data?._id}/category/${data?._id}`)}
                          onClick={() => toastService.warning('pendding category')}
                          className='p-3 bg-strokedark  text-white w-[90%] rounded-md font-semibold'
                        >
                          Chi Tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExamConfiguration
