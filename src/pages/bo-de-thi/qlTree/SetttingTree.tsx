import { Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import React, { useState } from 'react'
import { Button } from '~/components'

const SetttingTree = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = () => {}
  return (
    <>
      <Drawer
        title='Create a new categories'
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
          <Row gutter={22}>
            <Col span={22}>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>Tên Phòng Ban</p>}
                rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
              >
                <Input className='ml-7' placeholder='vui lòng nhập Tên Phòng Ban ...!' />
              </Form.Item>
            </Col>
          </Row>
          <p className='my-5 font-bold text-xl'>Categoies thuộc </p>
          <Select mode='multiple' placeholder='Inserted are removed' style={{ width: '100%', height:"45px" }} />
          <button
            type='submit'
            className=' mt-5  w-full btn flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
          >
            Submit
          </button>
        </Form>
      </Drawer>
      <div>
        <div
          onClick={showDrawer}
          className='w-full h-[60px] cursor-pointer flex items-center dark:bg-black rounded-md bg-white'
        >
          <p className='text-left items-center pl-5'>Cấu Hình Categoies</p>
        </div>
        <div className='w-full mt-5 h-[60px] cursor-pointer flex items-center dark:bg-black rounded-md bg-white'>
          <p className='text-left items-center pl-5'>Tạo Kì Thi</p>
        </div>
      </div>
    </>
  )
}

export default SetttingTree
