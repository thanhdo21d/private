import { Form, Input, Popconfirm, Skeleton, Table, Tooltip } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { PiKeyReturnThin } from 'react-icons/pi'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
type FieldType = {
  keyword?: string
}
const ExamsQuestion = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: dataIdExmas, isLoading, isFetching } = useGetIdExamsCategoriesQuery(id as string)
  const queryConfig = useQueryConfig()
  const [addTopicQuestion] = useCreateTopicExamsMutation()
  const [removeTopic, { isLoading: isRemoveTopicLoading }] = useRemoveTopicExamsMutation()
  console.log(dataIdExmas?.data?.topicExams)
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
  const dataSource = dataIdExmas?.data?.topicExams.map((item: any, index: any) => ({
    STT: index + 1,
    key: item._id,
    status: item.status,
    startDate: item.startDate,
    endDate: item.endDate,
    updatedAt: item.updatedAt,
    name: item.name
  }))

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
      title: <p className='flex justify-center text-danger font-semibold text-xl'>actions</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
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
                {/* isRemoveLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : */}
                <span>{'Delete'}</span>
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <button
        type='submit'
        className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
      >
        Bộ Đề Thi
      </button>
      <div className='flex items-center justify-between'>
        <div className=''>
          <Form
            className='flex gap-5  justify-center'
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
              <Input className='h-[40px] w-[600px]' placeholder='Tìm Kiếm Theo đề thi ....' />
            </Form.Item>
            <Button type='submit' id='keycode13' styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'>
              Tìm Kiếm
            </Button>
          </Form>
        </div>
        <div className='flex items-center justify-end gap-5 '>
          <div
            className={` bg-danger cursor-pointer h-[40px] flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide   font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <Popconfirm
              title='Delete the task'
              description='Xóa tất cả sẽ không thể khôi phục , bạn đã chắc ?'
              okButtonProps={{
                style: { backgroundColor: 'blue', marginRight: '20px' }
              }}
              okText='Yes'
              cancelText='No'
            >
              <Tooltip title='Trở Về'>
                <p className='text-base font-medium text-black  flex items-center gap-4'>
                  <span>
                    <DeleteIcon />
                  </span>
                  <span className='text-white '> Xóa Tất Cả</span>
                </p>
              </Tooltip>
            </Popconfirm>
          </div>
          {/*  */}
          <Link
            to='create-exams'
            className={` bg-white h-[40px]  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide cursor-pointer  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <Tooltip title='Thêm Đề Thi'>
              <div className='text-base font-medium text-black  flex items-center gap-4'>
                <span>
                  <PiKeyReturnThin className='text-xl text-danger' />
                </span>
                <span> Thêm Đề Thi</span>
              </div>
            </Tooltip>
          </Link>
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
            <Pagination pageSize={5} queryConfig={queryConfig} />
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
