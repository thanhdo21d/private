import React, { useContext, useState } from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllDepartmentQuery } from '~/apis/department/department'
import { Button } from '~/components'
import { AppContext } from '~/contexts/app.contexts'
import { UnorderedListOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { category } from '~/types/department/department.type'
import { EyeOutlined } from '@ant-design/icons'
import { Col, DatePicker, Drawer, Form, Input, Row, Select, Skeleton, Space, Table } from 'antd'
import {
  useCreateCategoriesMutation,
  useEditCategoriesTreeMutation,
  useGetAllCategoriesDepartmentQuery,
  useGetAllCategoriesQuery,
  useGetCategoriesDepartmentsQuery,
  useRemoveCategoriesTreeMutation
} from '~/apis/category/categories'
import { toastService } from '~/utils/toask/toaskMessage'
import { Footer } from 'antd/es/layout/layout'
import { useGetIdUserQuery } from '~/apis/user/user.api'
import Pagination from '~/pages/roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
const DsDethi = () => {
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const isEdit: string | null = queryParameters.get('isEdit')
  const isCreate: string | null = queryParameters.get('isCreate')
  const search: string | null = queryParameters.get('search')
  const navigate = useNavigate()
  const { data: dataAllCategoriesDepartment, isLoading: isGetCategoriesDepartmentLoading } =
    useGetAllCategoriesDepartmentQuery({
      page: dataPageQuery || 1,
      limit: datalimitQueryChange || 10,
      search: search || ''
    })
  console.log(dataAllCategoriesDepartment)
  const [createCategories, { isLoading: isCreateCategoriesLoading }] = useCreateCategoriesMutation()
  const [removeCategories, { isLoading: isRemoveLoading }] = useRemoveCategoriesTreeMutation()
  const [editCategories] = useEditCategoriesTreeMutation()
  const queryConfig = useQueryConfig()
  const { profile, reset } = useContext(AppContext)
  console.log(profile)
  const { data: dataUser, isLoading, isFetching } = useGetIdUserQuery(profile?._id as string)
  console.log(dataUser?.user?.role?.adminDepartMent)
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
    if (isCreate && isCreate == '1') {
      createCategories({
        name: name,
        parentCheck: '1'
      })
        .unwrap()
        .then(() => {
          toastService.success('Created categories successfully')
          setOpen(false)
        })
    } else if (isEdit) {
      editCategories({
        id: isEdit,
        name: name,
        parentId: null
      })
        .unwrap()
        .then(() => {
          toastService.success('updated categories successfully')
          setOpen(false)
        })
    }
  }
  const onFinishSearch = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: keywordSpace
      }).toString()
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  const dataSource =
    dataUser?.user?.role.name == 'Admin'
      ? dataAllCategoriesDepartment?.data?.map((data: category, index: number) => ({
          index: index + 1,
          key: data._id,
          name: data.name
        }))
      : dataUser?.user?.role?.adminDepartMent
          .filter((items: category) => items.parentCheck !== '0')
          .map((data: category, index: number) => ({
            index: index + 1,
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
          <div className='flex justify-center space-x-2'>
            <Button
              onClick={() => {
                sessionStorage.removeItem('categories')
                localStorage.setItem('idCategories', id)
                return navigate(`/tree-menu/${id}/dashboard-other-admin`)
              }}
              styleClass='bg-[#3d5ee1] flex items-center w-fit '
            >
              <span>
                <EyeOutlined />
              </span>
              <span className='font-medium'> xem chi tiết </span>
            </Button>
            {dataUser?.user?.role.name == 'Admin' && (
              <>
                <Button
                  onClick={() => {
                    const confirmTrue = window.confirm('Are you sure you want to categories')
                    sessionStorage.removeItem('categories')
                    if (confirmTrue)
                      removeCategories(id)
                        .unwrap()
                        .then(() => toastService.success('deleted successfully'))
                  }}
                  styleClass='bg-danger flex items-center w-fit '
                >
                  <span className='font-medium  text-white'> xóa </span>
                </Button>
                <Button
                  onClick={() => {
                    showDrawer()
                    navigate({
                      search: createSearchParams({
                        isEdit: id
                      }).toString()
                    })
                  }}
                  styleClass='bg-meta-4 flex items-center w-fit '
                >
                  <span className='font-medium  text-white'> Sửa </span>
                </Button>
              </>
            )}
          </div>
        )
      }
    }
  ]
  if (isLoading || isFetching) return <div>Loading...</div>
  return (
    <div>
      <div className=' xl:flex justify-between mb-5'>
        <div>
          {dataUser?.user?.role.name == 'Admin' ? (
            <Form onFinish={onFinishSearch} onFinishFailed={onFinishFailed} className='flex gap-5' layout='vertical'>
              <Form.Item
                name='keyword'
                className=''
                rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
              >
                <Input
                  className='w-[250px] xl:w-[330px] border border-[#ccc]'
                  placeholder='vui lòng nhập Tên Phòng Ban ...!'
                />
              </Form.Item>
              <Form.Item>
                <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' type='submit'>
                  Submit
                </button>
              </Form.Item>
            </Form>
          ) : (
            ''
          )}
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
          <button
            className='bg-success px-8 rounded-md text-white font-medium py-2.5'
            onClick={() => {
              showDrawer()
              navigate({
                search: createSearchParams({
                  isCreate: '1'
                }).toString()
              })
            }}
          >
            New department
          </button>
        </div>
      </div>
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
        <Form onFinish={onFinish} layout='vertical'>
          <Form.Item
            name='name'
            label={<p className='font-bold text-xl mb-5'>Tên Phòng Ban</p>}
            rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
          >
            <Input className='rounded-md mb-5 border border-[#ccc]' placeholder='vui lòng nhập Tên Phòng Ban ...!' />
          </Form.Item>
          <button
            type='submit'
            className=' mt-5  w-full btn flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
          >
            Submit
          </button>
        </Form>
      </Drawer>
      <div className='min-h-screen relative w-full min-w-xl overflow-y-auto sm:rounded-2xl bg-white '>
        <h4 className='pl-5 pt-5 text-black underline'> Danh Sách DepartMents</h4>
        {checkOption ? (
          <div className='grid grid-cols-3 gap-5 mt-10'>
            {dataUser?.user?.role?.adminDepartMent
              .filter((items: category) => items.parentCheck !== '0')
              .map((data: category) => {
                console.log(data)
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
                                  onClick={() => navigate(`/tree-menu/${data?._id}/dashboard-other-admin`)}
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
          <>
            <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-black  mt-4 ' />
            <div>
              <Pagination pageSize={dataAllCategoriesDepartment?.totalPages} queryConfig={queryConfig} />
            </div>
          </>
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
