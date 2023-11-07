import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllDepartmentQuery } from '~/apis/department/department'
import { Button } from '~/components'
import { AppContext } from '~/contexts/app.contexts'
import { IDepartmentType, IDepartmentTypeDocs, category } from '~/types/department/department.type'
import { PlusOutlined } from '@ant-design/icons'
import { Col, DatePicker, Drawer, Form, Input, Row, Select, Skeleton, Space } from 'antd'
import { useCreateCategoriesMutation, useGetAllCategoriesQuery } from '~/apis/category/categories'
import { toastService } from '~/utils/toask/toaskMessage'
const DsDethi = () => {
  const navigate = useNavigate()
  const { data: dataAllCategories, isFetching: isGetCategoriesLoading } = useGetAllCategoriesQuery()
  const [createCategories, { isLoading: isCreateCategoriesLoading }] = useCreateCategoriesMutation()
  console.log(dataAllCategories)
  const { profile, reset } = useContext(AppContext)
  console.log(profile)
  const { Option } = Select
  const [open, setOpen] = useState(false)
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
  return (
    <div>
      <Button styleClass='mb-5' onClick={showDrawer} icon={<PlusOutlined />}>
        New department
      </Button>

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
      <div className='grid grid-cols-3 gap-5'>
        {profile?.role.adminDepartMent
          .filter((items: category) => items.parentCheck !== '0')
          .map((data: category) => {
            console.log(data)
            return (
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
                              onClick={() => navigate(`/tree-menu/${data?._id}/category/${data?._id}`)}
                              className='p-3 bg-strokedark  text-white w-[90%] rounded-md font-semibold'
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
    </div>
  )
}
export default DsDethi
