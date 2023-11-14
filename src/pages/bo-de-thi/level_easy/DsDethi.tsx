import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllDepartmentQuery } from '~/apis/department/department'
import { Button } from '~/components'
import { AppContext } from '~/contexts/app.contexts'
import { UnorderedListOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { category } from '~/types/department/department.type'
import { EyeOutlined } from '@ant-design/icons'
import { Col, DatePicker, Drawer, Form, Input, Row, Select, Skeleton, Space, Table } from 'antd'
import { useCreateCategoriesMutation, useGetAllCategoriesQuery } from '~/apis/category/categories'
import { toastService } from '~/utils/toask/toaskMessage'
import { Footer } from 'antd/es/layout/layout'
const DsDethi = () => {
  const navigate = useNavigate()
  const { data: dataAllCategories, isFetching: isGetCategoriesLoading } = useGetAllCategoriesQuery()
  const [createCategories, { isLoading: isCreateCategoriesLoading }] = useCreateCategoriesMutation()
  console.log(dataAllCategories)
  const { profile, reset } = useContext(AppContext)
  console.log(profile)
  const { Option } = Select
  const [open, setOpen] = useState(false)
  const [checkOption, setCheckOption] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = ({ name }: { name: string }) => {
    createCategories({
      name: name,
      parentCheck: '1'
    })
      .unwrap()
      .then(() => {
        toastService.success('Created categories successfully')
        setOpen(false)
      })
  }
  const dataSource = profile?.role.adminDepartMent
    .filter((items: category) => items.parentCheck !== '0')
    .map((data: category, index: number) => ({
      index: index,
      key: data._id,
      name: data.name
    }))

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <p className='flex justify-center'>Tác Vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center'>
            <Button
              onClick={() => navigate(`/tree-menu/${id}/category/${id}`)}
              styleClass='bg-[#3d5ee1] flex items-center w-fit '
            >
              <span>
                <EyeOutlined />
              </span>
              <span className='font-medium'> xem chi tiết </span>
            </Button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <div className='flex justify-between mb-5'>
        <div>
          <Form className='flex gap-5' onFinish={onFinish} layout='vertical' hideRequiredMark>
            <Form.Item
              name='name'
              className=''
              rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
            >
              <Input className='w-[330px] border border-[#ccc]' placeholder='vui lòng nhập Tên Phòng Ban ...!' />
            </Form.Item>
            <Form.Item
              name='name'
              className=''
              rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
            >
              <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' type='submit'>
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className='flex items-center gap-5'>
          <UnorderedListOutlined
            onClick={() => setCheckOption(false)}
            className='text-[20px] hover:bg-[#18AEFA] hover:border-[#18AEFA] p-2 cursor-pointer hover:font-bold text-white bg-[#3d5ee1] rounded-md border border-[#3d5ee1] shadow-lg ease-in-out'
          />
          <AppstoreAddOutlined
            onClick={() => setCheckOption(true)}
            className='text-[20px] p-2  border-[3px] border-[#EDF1F1] text-[#212529] ease-in-out bg-white shadow-lg rounded-md cursor-pointer hover:text-success'
          />
          <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' onClick={showDrawer}>
            New department
          </button>
        </div>
      </div>

      {isGetCategoriesLoading && (
        <div>
          <Skeleton /> <Skeleton /> <Skeleton /> <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
      <Drawer
        title='Create a new department'
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
                <Input className='ml-7 rounded-md' placeholder='vui lòng nhập Tên Phòng Ban ...!' />
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
      <div className='min-h-screen relative w-full min-w-xl overflow-y-auto sm:rounded-2xl bg-white '>
        <h4 className='pl-5 pt-5 text-black underline'> Danh Sách DepartMents</h4>
        {checkOption ? (
          <div className='grid grid-cols-3 gap-5 mt-10'>
            {profile?.role.adminDepartMent
              .filter((items: category) => items.parentCheck !== '0')
              .map((data: category) => {
                console.log(data)
                // return null
                return (
                  <div key={data?._id}>
                    <div className='flex justify-center'>
                      <div className='max-h-full w-[400px] border border-[#ccc] max-w-xl overflow-y-auto sm:rounded-2xl bg-white shadow-sm'>
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
                                  onClick={() => navigate(`/tree-menu/${data?._id}/category/${data?._id}`)}
                                  className='p-3 bg-strokedark  hover:bg-success text-white w-[90%] rounded-md font-semibold'
                                >
                                  Chi Tiết {data?.name}.
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  */}
                    </div>
                  </div>
                )
              })}
          </div>
        ) : (
          <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-black  mt-4 ' />
        )}
        <Footer className='mt-5 w-full  justify-between dark:bg-black absolute bottom-0'>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
        </Footer>
      </div>
    </div>
  )
}
export default DsDethi
