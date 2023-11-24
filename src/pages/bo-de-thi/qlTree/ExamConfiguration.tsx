import { Breadcrumb, Col, Drawer, Form, Input, Popconfirm, Row, Skeleton, Space, Table } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useState } from 'react'
import { Button } from '~/components'
import { DatePicker } from 'antd'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons'
import { UnorderedListOutlined, AppstoreAddOutlined } from '@ant-design/icons'
import { RangePickerProps } from 'antd/es/date-picker'
import {
  useCreateExamsDepartmentMutation,
  useGetAllExamsCategoriesQuery,
  useRemoveExamsCategoriesMutation
} from '~/apis/examSetting/examSetting'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
import Pagination from '~/pages/roles/Pagination'
import { Footer } from 'antd/es/layout/layout'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
const { RangePicker } = DatePicker
const ExamConfiguration = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [checkOption, setCheckOption] = useState(false)
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const queryConfig = useQueryConfig()
  const [createExamsCategories] = useCreateExamsDepartmentMutation()
  const {
    data: dataExamsCategories,
    isLoading: isDataExamsCategoriesLoading,
    isFetching
  } = useGetAllExamsCategoriesQuery({
    id: id,
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 10,
    search: search || ''
  })
  const [removeExamsCategories] = useRemoveExamsCategoriesMutation()
  console.log(dataExamsCategories)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: ''
  })
  const onDateChange = (_: any, dateString: any) => {
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
  const confirm = async (idCate: string) => {
    await removeExamsCategories({
      id: idCate,
      idCate: id
    })
      .unwrap()
      .then(() => toastService.success('Successfully removed'))
  }
  const dataSource = dataExamsCategories?.examsKT?.examsKT?.map((items: any, index: any) => ({
    key: items._id,
    index: index + 1,
    name: items.name,
    status: items.status,
    start: items.startDate,
    end: items.endDate
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
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'ngày bắt đầu',
      dataIndex: 'start',
      key: 'start',
      render: (text: string) => {
        return <p>{text?.split('T')[0]}</p>
      }
    },
    {
      title: 'ngày kết thúc',
      dataIndex: 'end',
      key: 'end',
      render: (text: string) => {
        return <p>{text?.split('T')[0]}</p>
      }
    },
    {
      title: <p className='flex justify-center'>Tác Vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center gap-5'>
            <Button onClick={() => navigate(`bai-thi/${id}`)} styleClass='bg-[#3d5ee1] flex items-center w-fit '>
              <span>
                <EyeOutlined />
              </span>
              <span className='font-medium'> xem chi tiết </span>
            </Button>
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
              <Button styleClass='bg-danger flex items-center w-fit '>
                <span>
                  <DeleteOutlined />
                </span>
                <span className='font-medium'> DELETE </span>
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
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
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: 'Cài Đặt'
          },
          {
            title: 'Danh sách Kì Thi'
          }
        ]}
      />
      <div className='flex justify-between mb-5 mt-10'>
        <div>
          <Form className='flex gap-5' onFinish={onFinishSearch} layout='vertical' hideRequiredMark>
            <Form.Item
              name='keyword'
              className=''
              rules={[{ required: true, message: 'vui lòng nhập Tên Kì Thi ...!' }]}
            >
              <Input className='w-[330px] border border-[#ccc]' placeholder='vui lòng nhập Tên Kì Thi ...!' />
            </Form.Item>
            <Form.Item>
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
            Kì Thi Mới
          </button>
        </div>
      </div>
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
          <Form.Item name='name' label='Tên Kì Thi' rules={[{ required: true, message: 'Vui lòng nhập Tên Kì Thi!' }]}>
            <Input placeholder='Vui lòng nhập Tên Kì Thi!' />
          </Form.Item>
          <Form.Item label='Thời Gian Diễn ra kì thi'>
            <DatePicker.RangePicker onChange={onDateChange} />
          </Form.Item>
          <Form.Item>
            <Button type='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Drawer>
      {isDataExamsCategoriesLoading ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <>
          {checkOption ? (
            <div className='grid grid-cols-3 mt-5 gap-5'>
              {dataExamsCategories?.exam?.examsKT?.map((data: any) => (
                <div key={data?._id}>
                  <div className=''>
                    <div className='max-h-full max-w-[400px] overflow-y-auto sm:rounded-2xl bg-white'>
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
                          <div className='mt-5 mx-auto  '>
                            <div className='flex justify-center'>
                              <button
                                // onClick={() => navigate(`/tree-menu/${data?._id}/category/${data?._id}`)}
                                onClick={() => navigate(`bai-thi/${data?._id}`)}
                                className='p-3 bg-strokedark  text-white w-[90%] rounded-md font-semibold'
                              >
                                Chi Tiết
                              </button>
                            </div>
                            <div className='flex justify-center mt-5'>
                              <Popconfirm
                                title='Delete the task'
                                description='Are you sure to delete this task?'
                                onConfirm={() => confirm(data?._id)}
                                okText='Yes'
                                okButtonProps={{
                                  style: { backgroundColor: 'blue' }
                                }}
                                cancelText='No'
                                placement='rightBottom'
                              >
                                <button className='p-3 bg-warning  text-white w-[90%] rounded-md font-semibold'>
                                  Remove
                                </button>
                              </Popconfirm>
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
          ) : (
            <>
              <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-black  mt-4 ' />
            </>
          )}
        </>
      )}
      <Footer className='mt-5 w-full  justify-between dark:bg-black absolute bottom-0'>
        <div>
          <Pagination pageSize={dataExamsCategories?.totalPages} queryConfig={queryConfig} />
        </div>
        <div className='text-md mt-5 font-semibold text-center dark:text-white'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
      </Footer>
    </div>
  )
}

export default ExamConfiguration
