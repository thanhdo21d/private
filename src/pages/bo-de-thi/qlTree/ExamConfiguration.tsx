import { Breadcrumb, Col, Drawer, Form, Input, Popconfirm, Row, Skeleton, Space, Table } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import React, { useEffect, useState } from 'react'
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
          <div className='2xl:flex space-y-5 2xl:space-y-0 justify-center gap-2'>
            <Button onClick={() => navigate(`edit/${id}`)} styleClass=' flex items-center 2xl:w-fit w-[177px]'>
              <span className='font-medium'>sửa </span>
            </Button>
            <Button
              onClick={() => navigate(`bai-thi/${id}`)}
              styleClass='bg-[#3d5ee1] flex items-center !px-2 2xl:w-fit w-[177px]'
            >
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
              <Button styleClass='bg-danger flex items-center !px-2  2xl:w-fit w-[177px]'>
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
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  return (
    <div className='relative'>
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
          <Form
            className='flex gap-5'
            onFinish={onFinishSearch}
            onFinishFailed={onFinishFailed}
            layout='vertical'
            hideRequiredMark
          >
            <Form.Item
              name='keyword'
              className=''
              rules={[{ required: true, message: 'vui lòng nhập Tên Kì Thi ...!' }]}
            >
              <Input className='w-[330px] border !border-[#ccc]' placeholder='vui lòng nhập Tên Kì Thi ...!' />
            </Form.Item>
            <Form.Item>
              <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' type='submit'>
                Submit
              </button>
            </Form.Item>
          </Form>
        </div>
        <div className='flex items-center gap-5'>
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
          <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-black  mt-4 ' />
          <Footer className='mt-5 w-full  justify-between dark:bg-black '>
            <div>
              <Pagination pageSize={dataExamsCategories?.totalPages} queryConfig={queryConfig} />
            </div>
            <div className='text-md mt-5 font-semibold text-center dark:text-white'>
              Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
            </div>
          </Footer>
        </>
      )}
    </div>
  )
}

export default ExamConfiguration
