import { Col, Drawer, Form, Input, Row, Space } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import { Button } from '~/components'
import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
const { RangePicker } = DatePicker
const ExamConfiguration = () => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = (values : any) => {
    setFormData(values)
    console.log(values)
  }
  const [size, setSize] = useState<SizeType>('middle')
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
    // dispatch(setOrderDate({ startDate: dateString[0], endDate: dateString[1] }))
  }
  return (
    <div>
      <Button onClick={showDrawer}> Tạo Kì Thi </Button>
      <Drawer
        title='Cấu Hình Kì Thi'
        width={720}
        onClose={onClose}
        open={open}
        extra={
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
            <DatePicker.RangePicker onChange={onDateChange}/>
          </Form.Item>
          {/* Submit Button */}
          <Form.Item>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ExamConfiguration
