import { Col, Drawer, Form, Input, Popconfirm, Row, Space, Table } from 'antd'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Button, EmailIcon } from '~/components'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import Pagination from '~/pages/roles/Pagination'

const MemberDepartment = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }
  ]

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: <p className='flex justify-center'>Tác Vụ</p>,
      render: ({ key: id }: { key: string }) => (
        <div className='flex space-x-2'>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            onConfirm={() => confirm(id)}
            okText='Yes'
            okButtonProps={{
              style: { backgroundColor: 'blue' }
            }}
            cancelText='No'
            placement='rightBottom'
          >
            <Button styleClass='bg-danger flex items-center w-fit w-[100px]'>
              <span>
                <DeleteIcon />
              </span>
              <span className='font-medium'> Xóa</span>
            </Button>
          </Popconfirm>
          <Button styleClass='flex items-center w-[100px]' onClick={() => navigate(`/admin/member/${id}/edit`)}>
            <span>
              <AiFillEdit />
            </span>
            <span>Sửa</span>
          </Button>
          <Button styleClass='flex items-center w-[100px]'>
            <span>
              <EmailIcon />
            </span>
            <span>Mailer</span>
          </Button>
        </div>
      )
    }
  ]
  return (
    <div>
      <Drawer
        title='Create a new exams'
        width={820}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark>
          <Row gutter={22}>
            <Col span={22}>
              <Form.Item
                name='name'
                label={<p className='font-bold text-xl'>tên nhân viên</p>}
                rules={[{ required: true, message: 'vui lòng nhập tên nhân viên ...!' }]}
              >
                <Input className='ml-7 rounded-md ' placeholder='vui lòng nhập tên nhân viên ...!' />
              </Form.Item>
            </Col>
          </Row>
          <button
            type='submit'
            className='  w-full btn flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
          >
            Submit
          </button>
        </Form>
      </Drawer>
      <Button styleClass='bg-warning' onClick={showDrawer}>
        Thêm mới
      </Button>
      <div className='mt-10 flex gap-5'>
        <Input className='h-[50px] w-[600px]' placeholder='Tìm Kiếm Theo Code ....' />
        <Button styleClass='w-[150px] h-[50px] bg-graydark'>Tìm Kiếm</Button>
      </div>
      <hr className='mt-5' />
      <div className='mt-2'>
        <Table dataSource={dataSource} pagination={false} columns={columns} />
        <div className='mt-5 float-right'>
          <Pagination pageSize={5} />
        </div>
      </div>
      <div className='absolute bottom-0 text-center'>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</div>
    </div>
  )
}

export default MemberDepartment
