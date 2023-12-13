import { Divider, Drawer, Form, Input, Popconfirm, Skeleton, Space, Table, Tooltip, Upload } from 'antd'
import logoExsl from '../../../assets/xlsx.png'
import { Footer } from 'antd/es/layout/layout'
import { useEffect, useState, useMemo } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDropDbExamsMutation } from '~/apis/department/department'
import { Button } from '~/components'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
import logoBacktop from '../../../assets/images/logo/top.png'
import { AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import logoAdd from '../../../assets/plus.png'
import leftArrow from '../../../assets/left-arrow.png'
import logoRemove from '../../../assets/delete.png'
import DetailsDsEasy from '../level_easy/DetailsDsEasy'
import { useGetIDcategoriesQuery, useRemoveExamsDepartmentMutation } from '~/apis/category/categories'
import InputNumber from '~/components/inputNumber'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import axios from 'axios'
type FieldType = {
  keyword?: string
}
const { TextArea } = Input
const FormData = () => {
  const queryConfig = useQueryConfig()
  const uri = import.meta.env.VITE_API
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [showImage, setShowImage] = useState<boolean>(false)
  const [Image, setImage] = useState<string>('')
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const [datalimitQuery, setDatalimitQuery] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatalimitQuery(event.target.value)
  }
  const {
    data: getDetailsExams,
    isFetching,
    isLoading
  } = useGetIDcategoriesQuery({
    id: id,
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 30,
    search: search || ''
  })
  const [
    removeExamsDepartment,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess, isError: isRemoveExamsError }
  ] = useRemoveExamsDepartmentMutation()
  const navigate = useNavigate()
  const confirm = (idExams: string) => {
    removeExamsDepartment({
      id: id,
      body: [idExams]
    })
      .unwrap()
      .then(() => toastService.success('Delete success'))
    if (isRemoveExamsError) toastService.error('errror')
  }
  const cancel = () => {
    toastService.error('Click on No')
  }
  const handelGetDetailsExams = ({ idExams, idQuestion }: any) => {
    console.log(typeof idExams, typeof idQuestion)
    if (idExams) {
      navigate({
        pathname: `/details-exams/${idExams}`
      })
      return
    }
    if (idQuestion) {
      navigate({
        pathname: `/question/edit/${idQuestion}`
      })
      return
    }
  }
  const [handelDropExasm] = useDropDbExamsMutation()
  const handelDropDbExmams = () => {
    handelDropExasm({
      idDepartment: id
    })
      .unwrap()
      .then(() => toastService.success('Drop db successfully deleted'))
  }
  const dataSource = getDetailsExams?.data?.easy.map((items: any, index: number) => ({
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
        return (
          <div>
            <Tooltip title='Click details'>
              {img && (
                <img
                  onClick={() => {
                    setShowImage(!showImage)
                    setImage(`${uri}${img}`)
                  }}
                  className='w-[50px] cursor-pointer hover:scale-110'
                  loading='lazy'
                  crossOrigin='anonymous'
                  src={`${uri}${img}`}
                />
              )}
            </Tooltip>
          </div>
        )
      }
    },
    {
      title: <p className='flex justify-center text-danger font-semibold text-xl'>actions</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <Button
              onClick={() => handelGetDetailsExams({ idExams: id })}
              id='buttonmodal'
              styleClass='focus:outline-none !p-2 w-[70px]  bg-success hover:bg-warning text-white '
              type='button'
            >
              Chi Tiết
            </Button>
            <Button
              styleClass='p-2 w-[80px] flex items-center focus:outline-none hover:bg-warning'
              onClick={() => handelGetDetailsExams({ idQuestion: id })}
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
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    if (Number(datalimitQuery) < 1) {
      alert('Số Bản Ghi Ít Nhất Là 1')
      return false
    }
    navigate({
      search: createSearchParams({
        ...queryConfig,
        limit: datalimitQuery
      }).toString()
    })
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
  const handelExport = async () => {
    try {
      const response = await axios.post(`${uri}export/question/${id}`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'export.xlsx')
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error: any) {
      console.error('Lỗi: ' + error.message)
    }
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
      <>
        <Drawer
          title='Create a new exams'
          width={920}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={() => navigate('/question/add')}>Thêm Bằng input</Button>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <DetailsDsEasy />
        </Drawer>
      </>
      <div>
        <button
          type='submit'
          className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
        >
          Bộ Câu Hỏi Thi
          {/* {data?.data.name} */}
        </button>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Form
            className='flex gap-5  justify-center'
            name='basic'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
              <Input
                className='h-[40px] w-[500px] xl:w-[600px] border border-[#ccc]'
                placeholder='Tìm Kiếm Theo câu hỏi ....'
              />
            </Form.Item>
            <Button type='submit' id='keycode13' styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'>
              Tìm Kiếm
            </Button>
          </Form>
        </div>
      </div>
      <div className=' items-center gap-5 mt-4 justify-between'>
        <div className='flex items-center gap-5 mt-4'>
          <div style={{ textDecoration: 'underline' }} className='text-md'>
            số bản ghi
          </div>
          <InputNumber
            className=''
            classNameError='hidden'
            classNameInput='h-8 w-20 xl:w-50 border-t border-b border-gray-300 p-1 text-center outline-none'
            onChange={handleChange}
            value={datalimitQuery}
          />
          <Button styleClass='py-1 px-1 hover:bg-opacity-80' onClick={handleClick}>
            Áp dụng
          </Button>
          <div>
            <Tooltip title='export to excels'>
              <img onClick={handelExport} className='w-[47px] cursor-pointer hover:scale-105' src={`${logoExsl}`} />
            </Tooltip>
          </div>
        </div>
        <div>
          {/*  */}
          <div className='flex items-center justify-end gap-5 mt-[15px]'>
            <div
              className={` bg-danger cursor-pointer h-[40px]  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide   font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
            >
              <Popconfirm
                title='Delete the task'
                description='Xóa tất cả sẽ không thể khôi phục , bạn đã chắc ?'
                onConfirm={handelDropDbExmams}
                okButtonProps={{
                  style: { backgroundColor: 'blue', marginRight: '20px' }
                }}
                okText='Yes'
                cancelText='No'
              >
                <Tooltip title='Trở Về'>
                  <p className='text-base font-medium text-black  flex items-center gap-4'>
                    <img className='w-[22px]' src={logoRemove} />
                    <span className='text-white'> Xóa Tất Cả</span>
                  </p>
                </Tooltip>
              </Popconfirm>
            </div>
            {/*  */}
            {showImage && (
              <div
                onClick={() => setShowImage(false)}
                className='fixed inset-0 w-full z-10   h-screen bg-black bg-opacity-5 flex mx-auto justify-center items-center'
              >
                <div className='w-1/3 flex mx-auto justify-center items-center'>
                  <img className='w-full h-full shadow-2xl' src={Image} />
                </div>
              </div>
            )}
            <div
              onClick={showDrawer}
              className={` bg-white h-[40px]  border border-[#ccc] flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide cursor-pointer  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
            >
              <Tooltip title='Thêm Câu Hỏi'>
                <div className='text-base font-medium text-black  flex items-center gap-4'>
                  <span>
                    <img className='w-[22px]' src={logoAdd} />
                  </span>
                  <span> Thêm Câu Hỏi</span>
                </div>
              </Tooltip>
            </div>
            <Button onClick={() => navigate(-1)} styleClass='py-2 bg-black flex  items-center gap-2 '>
              <img className='w-[25px]' src={leftArrow} />
              <span> Quay Lại</span>
            </Button>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <Tooltip title='back to top'>
          <img
            className='w-[50px] fixed bottom-10 z-10 right-1 cursor-pointer p-1 hover:bg-secondary'
            src={`${logoBacktop}`}
          />
        </Tooltip>
      </div>
      {/*  */}
      <div>
        {isLoading || isFetching ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <Table dataSource={dataSource} columns={columns} pagination={false} className='dark:bg-black  mt-4 ' />
        )}
        <Footer className='mt-5 2xl:flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div>
            <Pagination pageSize={getDetailsExams?.totalPages} queryConfig={queryConfig} />
          </div>
        </Footer>
      </div>
    </div>
  )
}
export default FormData
