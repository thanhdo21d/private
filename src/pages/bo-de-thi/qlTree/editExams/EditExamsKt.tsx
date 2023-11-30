import { DatePicker, Form, Input, Select, Skeleton } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetIdExamsCategoriesQuery } from '~/apis/examSetting/examSetting'
import { Button } from '~/components'
import dayjs from 'dayjs'
import { RangePickerProps } from 'antd/es/date-picker'
import axios from 'axios'
import { toastService } from '~/utils/toask/toaskMessage'
import Cookies from 'js-cookie'
import { Footer } from 'antd/es/layout/layout'
const EditExamsKt = () => {
  const { id } = useParams()
  const uri = import.meta.env.VITE_API
  const token = Cookies.get('token')
  const navigate = useNavigate()
  console.log(token, 'token')
  const [dataDate, setDataDate] = useState({
    startDate: '',
    endDate: ''
  })
  const dateFormat = 'YYYY/MM/DD'
  const {
    data: dataIdExmas,
    isLoading,
    isFetching
  } = useGetIdExamsCategoriesQuery({
    id: id,
    page: 1,
    limit: 1,
    search: ''
  })
  console.log(dataIdExmas)
  const onFinish = async (value: any) => {
    try {
      await axios.patch(
        `${uri}edit/examsKt/${id}`,
        {
          name: value.name,
          status: value.tt,
          startDate: dataDate.startDate ? dataDate.startDate : undefined,
          endDate: dataDate.endDate ? dataDate.endDate : undefined
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      toastService.success('Updated')
      window.location.reload()
    } catch (error) {
      toastService.error('error')
    }
  }
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    setDataDate({
      startDate: dateString[0],
      endDate: dateString[1]
    })
  }
  console.log(dataDate)
  return (
    <div className='relative'>
      <Button onClick={() => navigate(-1)} styleClass='mb-10 py-2 bg-success'>
        Quay lại
      </Button>
      {isLoading || isFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Form
          initialValues={{ name: dataIdExmas.data.name, tt: dataIdExmas.data.status }}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item name='name' label='Tên Kì Thi' rules={[{ required: true, message: 'Vui lòng nhập Tên Kì Thi!' }]}>
            <Input className='border border-[#ccc] rounded-md' placeholder='Vui lòng nhập Tên Kì Thi!' />
          </Form.Item>
          <Form.Item name='date' label='Thời Gian Diễn ra kì thi'>
            <DatePicker.RangePicker
              onChange={onDateChange}
              defaultValue={[
                dayjs(dataIdExmas?.data?.startDate?.split('T')[0], dateFormat),
                dayjs(dataIdExmas?.data?.endDate?.split('T')[0], dateFormat)
              ]}
            />
          </Form.Item>
          <Form.Item name='tt' label='Trạng Thái' rules={[{ required: true, message: 'Vui lòng nhập Tên Kì Thi!' }]}>
            <Select
              options={[
                { value: 'inactive', label: 'inactive' },
                { value: 'active', label: 'active' }
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      )}
      <div className=''>
        <Footer className='mt-45 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div className='text-md font-semibold text-center dark:text-white'>design by thanhdo IS.</div>
        </Footer>
      </div>
    </div>
  )
}

export default EditExamsKt
