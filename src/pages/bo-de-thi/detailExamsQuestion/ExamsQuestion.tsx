import { Drawer, Form, Input, Popconfirm, Skeleton, Space, Table, Tooltip } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { PiKeyReturnThin } from 'react-icons/pi'
import { Link, createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import logoPdf from '../../../assets/pdf.png'
import {
  useCreateTopicExamsMutation,
  useGetIdExamsCategoriesQuery,
  useRemoveTopicExamsMutation
} from '~/apis/examSetting/examSetting'
import { Button } from '~/components'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import InputNumber from '~/components/inputNumber'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
import axios from 'axios'
type FieldType = {
  keyword?: string
}
const ExamsQuestion = () => {
  const navigate = useNavigate()
  const uri = import.meta.env.VITE_API
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const {
    data: dataIdExmas,
    isLoading,
    isFetching
  } = useGetIdExamsCategoriesQuery({
    id: id,
    page: dataPageQuery,
    limit: datalimitQueryChange,
    search: search || ''
  })
  const queryConfig = useQueryConfig()
  const [addTopicQuestion] = useCreateTopicExamsMutation()
  const [removeTopic, { isLoading: isRemoveTopicLoading }] = useRemoveTopicExamsMutation()
  const confirm = (idExams: string) => {
    removeTopic({
      id: idExams,
      idkt: id
    })
      .unwrap()
      .then(() => toastService.success('Delete success'))
      .catch(() => toastService.error('errror'))
  }
  const cancel = () => {
    toastService.error('Click on No')
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const handelExportPdf = async (id: string) => {
    try {
      const response = await axios.get(`${uri}export/topicExams/${id}`, {
        responseType: 'blob'
      })
      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
        const pdfUrl = window.URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = pdfUrl
        a.download = 'exported.pdf'
        a.click()
        toastService.success('Export success')
      } else {
        toastService.error('Export failed')
      }
    } catch (error) {
      console.error('Export error:', error)
      toastService.error('Export failed')
    }
  }
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: keywordSpace
      }).toString()
    })
  }
  const aproveHistory = (id: string) => {
    navigate({
      pathname: 'create-exams',
      search: createSearchParams({
        history: id
      }).toString()
    })
  }
  const dataSource = dataIdExmas?.data?.topicExams.map((item: any, index: any) => ({
    STT: index + 1,
    key: item._id,
    status: item.status,
    startDate: item.startDate,
    endDate: item.endDate,
    updatedAt: item.updatedAt,
    name: item.name
  }))

  const dataSourceHistory = dataIdExmas?.data?.topicExams.map((item: any, index: any) => ({
    STT: index + 1,
    key: item._id,
    name: item.name
  }))
  console.log(dataIdExmas)
  const columnsHistory = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <p className='flex justify-center text-danger font-semibold text-xl'>tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex space-x-2 items-center justify-center gap-3'>
            <Button styleClass='p-2 !px-3 flex items-center focus:outline-none hover:bg-warning'>
              <span>
                <AiFillEdit />
              </span>
              <p onClick={() => aproveHistory(id)}>áp dụng</p>
            </Button>
          </div>
        )
      }
    }
  ]

  const columns = [
    {
      title: 'STT',
      dataIndex: 'STT',
      key: 'STT'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'start date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (items: string) => {
        return <p>{items.split('T')[0]}</p>
      }
    },
    {
      title: 'end date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (items: string) => {
        return <p>{items.split('T')[0]}</p>
      }
    },
    {
      title: 'updatedAt',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (items: string) => {
        return <p>{items.split('T')[0]}</p>
      }
    },
    {
      title: <p className='flex justify-center text-danger font-semibold text-xl'>tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='2xl:flex grid grid-cols-2 items-center justify-center gap-3'>
            <Link
              to={`${id}/details-exams`}
              id='buttonmodal'
              className='focus:outline-none !p-2 w-[70px] rounded-md  bg-success hover:bg-warning text-white '
            >
              Chi Tiết
            </Link>
            <Button styleClass='p-2 w-[80px] flex items-center focus:outline-none hover:bg-warning'>
              <span>
                <AiFillEdit />
              </span>
              <span>Edit</span>
            </Button>
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task?'
              okButtonProps={{
                style: { backgroundColor: 'blue', marginRight: '20px' }
              }}
              onConfirm={() => confirm(id)}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button styleClass='p-2 w-[80px] flex items-center focus:outline-none hover:bg-danger'>
                <span>
                  <DeleteIcon />
                </span>
                <span>{'Delete'}</span>
              </Button>
            </Popconfirm>
            <div className='p-2 w-[80px] flex items-center focus:outline-none hover:scale-105'>
              <Tooltip title='Export to Pdf'>
                <img
                  onClick={() => handelExportPdf(id)}
                  className='w-[50px] h-[40px] cursor-pointer'
                  src={`${logoPdf}`}
                />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ]
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  return (
    <div>
      <Drawer
        title='Details Questions'
        placement={'right'}
        width={900}
        className='absolute z-10000000'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button styleClass='py-2' onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Table dataSource={dataSourceHistory} columns={columnsHistory} pagination={false} />
      </Drawer>
      <button
        type='submit'
        className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
      >
        Bộ Đề Thi
      </button>
      <div className='flex items-center justify-between'>
        <div className=''>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='flex gap-5  justify-center'
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
              <Input className='h-[40px] w-[400px] 2xl:w-[600px]' placeholder='Tìm Kiếm Theo đề thi ....' />
            </Form.Item>
            <Button type='submit' id='keycode13' styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'>
              Tìm Kiếm
            </Button>
          </Form>
        </div>
        <div className='2xl:flex grid grid-cols-1 gap-y-2 items-center justify-end gap-5 '>
          <Link
            to='create-exams'
            className={` bg-white h-[40px]  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide cursor-pointer  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <Tooltip title='Thêm Đề Thi'>
              <div className='text-base font-medium text-black  flex items-center gap-4'>
                <span>
                  <PiKeyReturnThin className='text-xl text-danger' />
                </span>
                <span> Thêm Đề Thi Mới</span>
              </div>
            </Tooltip>
          </Link>
          <div
            className={` bg-white h-[40px]  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide cursor-pointer  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <div className='text-base font-medium text-black  flex items-center gap-4'>
              <span>
                <PiKeyReturnThin className='text-xl text-danger' />
              </span>
              <span onClick={showDrawer}> Thêm Đề Từ Cấu Trúc Cũ</span>
            </div>
          </div>
        </div>
      </div>
      {isLoading || isFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='mt-5'>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      )}

      <div>
        <Footer className='mt-5 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div>
            <Pagination pageSize={dataIdExmas?.totalPages} queryConfig={queryConfig} />
            <div className='flex items-center gap-5 mt-4'>
              <div style={{ textDecoration: 'underline' }} className='text-md'>
                số bản ghi
              </div>
              <div className='flex items-center gap-5 mt-4'>
                <InputNumber
                  className=''
                  classNameError='hidden'
                  classNameInput='h-8 w-50 border-t border-b border-gray-300 p-1 text-center outline-none'
                />
                <Button styleClass='py-1 px-1 hover:bg-opacity-80'>Áp dụng</Button>
              </div>
            </div>
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default ExamsQuestion
