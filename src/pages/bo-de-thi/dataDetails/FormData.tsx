import { Badge, Descriptions, DescriptionsProps, Form, Input, Popconfirm, Select, Skeleton, Table, Tooltip } from 'antd'
import { SelectCommonPlacement } from 'antd/es/_util/motion'
import { Footer } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  useGetDetailsExamsQuery,
  useGetExamsDepartmentQuery,
  useGetIdDepartmentQuery,
  useRemoveExamsDepartmentMutation
} from '~/apis/department/department'
import { Button } from '~/components'
import Pagination from '~/pages/roles/Pagination'
import { DownOutlined } from '@ant-design/icons'
import { toastService } from '~/utils/toask/toaskMessage'
import { PiKeyReturnThin } from 'react-icons/pi'
import logoBacktop from '../../../assets/images/logo/top.png'
import { AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import DeleteIcon from '~/components/Icons/DeleteIcon'
type FieldType = {
  keyword?: string
}
const FormData = () => {
  const url = import.meta.env.VITE_API
  const { id } = useParams()
  const [placement, SetPlacement] = useState<SelectCommonPlacement>('topLeft')
  const [queryParameters] = useSearchParams()
  const dataExamsQuery: any = queryParameters.get('exams')
  const dataExamsQueryID: string | null = queryParameters.get('idExams')
  const dataPageQuery: string | null = queryParameters.get('page')
  const { data, isFetching, isLoading } = useGetIdDepartmentQuery(id as string)
  const { data: dataExams, isLoading: isLoadingExam } = useGetExamsDepartmentQuery({
    id: id,
    exams: dataExamsQuery || 'easy',
    page: 1,
    limit: 30
  })
  const { data: getDetailsExams } = useGetDetailsExamsQuery({
    idDepartment: dataExamsQueryID,
    exams: dataExamsQuery || 'easy'
  })
  const [
    removeExamsDepartment,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess, isError: isRemoveExamsError }
  ] = useRemoveExamsDepartmentMutation()
  const navigate = useNavigate()
  const confirm = (idExams: string) => {
    removeExamsDepartment({
      id: id,
      body: [idExams],
      exmas: dataExamsQuery
    })
      .unwrap()
      .then(() => toastService.success('Delete success'))
    if (isRemoveExamsError) toastService.error('errror')
  }
  const cancel = () => {
    toastService.error('Click on No')
  }
  const handelGetDetailsExams = (idExams: string) => {
    navigate({
      pathname: `/admin/details-exams/${idExams}`,
      search: createSearchParams({
        exams: dataExamsQuery || 'easy'
      }).toString()
    })
  }
  const dataSource = dataExams?.data?.map((items: any, index: number) => ({
    key: items._id,
    index: index + 1,
    question: items.question,
    point: items.point,
    option: items.option,
    updateAt: items.updatedAt,
    image: items.image[0]
  }))
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: <p className='flex justify-center'>question</p>,
      dataIndex: 'question',
      key: 'question'
    },
    {
      title: <p className='flex justify-center'>updateAt</p>,
      dataIndex: 'updateAt',
      key: 'updateAt',
      render: (text: any) => {
        const check = text.split('T')
        const checkTime = check[1].split('.')
        const date = text.split('T')[0]
        return (
          <p className='text-md flex text-center items-center gap-5 justify-center font-medium'>
            <span className='font-bold'>{date}</span> <span>{checkTime[0]}</span>
          </p>
        )
      }
    },
    {
      title: <p className='flex justify-center'>image</p>,
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => {
        return <img className='w-[50px]' crossOrigin='anonymous' src={`${url}${img}`} />
      }
    },
    {
      title: (
        <div className='text-md font-bold flex justify-center'>
          <Select
            defaultValue='Options'
            style={{ width: 130 }}
            placement={placement}
            options={[
              {
                value: 'Options',
                label: <p>Options</p>
              },
              {
                value: 'NingBo',
                label: <p>lý thuyết</p>
              },
              {
                value: 'WenZhou',
                label: <p onClick={() => alert('ok')}>thực hành</p>
              }
            ]}
          />
        </div>
      ),
      dataIndex: 'option',
      key: 'option',
      render: (text: string) => {
        return <p className='flex justify-center'>{text}</p>
      }
    },
    {
      title: <p className='flex justify-center text-danger font-semibold text-xl'>actions</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <Button
              onClick={() => handelGetDetailsExams(id)}
              id='buttonmodal'
              styleClass='focus:outline-none !p-2 w-[70px]  bg-success hover:bg-warning text-white '
              type='button'
            >
              Chi Tiết
            </Button>
            <Button
              styleClass='p-2 w-[80px] flex items-center focus:outline-none hover:bg-warning'
              onClick={() => navigate(`/admin/details/dethi/edit/${id}`)}
            >
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
                <span>{isRemoveLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Delete'}</span>
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <div>
        <button
          type='submit'
          className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
        >
          Bộ Đề Thi {data?.data.name}
        </button>
      </div>
      <div className='flex items-center justify-between'>
        <div className=''>
          <Form
            className='flex gap-5'
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
              <Input className='h-[50px] w-[600px]' placeholder='Tìm Kiếm Theo đề thi ....' />
            </Form.Item>
            <Button type='submit' id='keycode13' styleClass='w-[150px] h-[50px] bg-graydark hover:bg-success'>
              Tìm Kiếm
            </Button>
          </Form>
        </div>
        <div className='flex items-center justify-end gap-10 '>
          <div className='z-50'>
            <div className='flex items-center justify-center '>
              <div className=' relative inline-block text-left dropdown'>
                <span className='rounded-md shadow-sm'>
                  <button
                    className='inline-flex justify-between hover:bg-warning hover:text-white  w-[200px] px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800'
                    type='button'
                    aria-haspopup='true'
                    aria-expanded='true'
                    aria-controls='headlessui-menu-items-117'
                  >
                    <span>Loại Câu Hỏi</span>
                    <span>
                      <svg className='w-5 h-5 ml-2 -mr-1' viewBox='0 0 20 20' fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </button>
                </span>
                <div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
                  <div
                    className='absolute right-0 w-64 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
                    aria-labelledby='headlessui-menu-button-1'
                    id='headlessui-menu-items-117'
                    role='menu'
                  >
                    <div
                      onClick={() =>
                        navigate({
                          search: createSearchParams({
                            exams: 'easy'
                          }).toString()
                        })
                      }
                      className='px-4 py-3 hover:bg-warning cursor-pointer '
                    >
                      <p className='text-sm  hover:text-white hover:font-medium font-medium leading-5 text-gray-900 truncate'>
                        Danh Sách Câu Hỏi Dễ
                      </p>
                    </div>
                    <div
                      onClick={() =>
                        navigate({
                          search: createSearchParams({
                            exams: 'normal'
                          }).toString()
                        })
                      }
                      className='py-1 hover:bg-warning cursor-pointer'
                    >
                      <a
                        tabIndex={0}
                        className='text-gray-700 hover:text-white hover:font-medium flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'
                      >
                        Danh Sách Câu Hỏi Trung Bình
                      </a>
                    </div>
                    <div
                      onClick={() =>
                        navigate({
                          search: createSearchParams({
                            exams: 'hard'
                          }).toString()
                        })
                      }
                      className='py-1 hover:bg-warning cursor-pointer'
                    >
                      <a
                        tabIndex={3}
                        className='text-gray-700 flex hover:text-white hover:font-medium justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'
                      >
                        Danh Sách Câu Hỏi Khó
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={` bg-white  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide   font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <Tooltip title='Trở Về'>
              <Link className='text-base font-medium text-black  flex items-center gap-4' to='/admin/de-kho'>
                <span>
                  <PiKeyReturnThin className='text-xl text-danger' />
                </span>
                <span> Quay Lại</span>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <Tooltip title='back to top'>
          <img
            className='w-[50px] fixed bottom-10 right-5 cursor-pointer p-1 hover:bg-secondary'
            src={`${logoBacktop}`}
          />
        </Tooltip>
      </div>
      {/*  */}
      <div>
        {isLoading || isFetching || isLoadingExam ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        )}
        <Footer className='mt-5 flex justify-between'>
          <div className='text-md font-semibold text-center'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div>
            <Pagination pageSize={2} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default FormData
