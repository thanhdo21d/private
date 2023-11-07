import { Col, Drawer, DrawerProps, Form, Input, Popconfirm, Row, Skeleton, Space, Table, Tooltip } from 'antd'
import { SelectCommonPlacement } from 'antd/es/_util/motion'
import { Footer } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { Link, createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDropDbExamsMutation } from '~/apis/department/department'
import { Button } from '~/components'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
import { PiKeyReturnThin } from 'react-icons/pi'
import logoBacktop from '../../../assets/images/logo/top.png'
import { AiFillEdit, AiOutlineLoading3Quarters } from 'react-icons/ai'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import DetailsDsEasy from '../level_easy/DetailsDsEasy'
import { useGetIDcategoriesQuery, useRemoveExamsDepartmentMutation } from '~/apis/category/categories'
type FieldType = {
  keyword?: string
}
const FormData = () => {
  const url = import.meta.env.VITE_API
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const [showExcel, setShowExcel] = useState<boolean>(false)
  const {
    data: getDetailsExams,
    isFetching,
    isLoading
  } = useGetIDcategoriesQuery({
    id: id,
    page: dataPageQuery || 1,
    limit: 10
  })
  console.log(getDetailsExams)
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
  const handelGetDetailsExams = (idExams: string) => {
    navigate({
      pathname: `/tree-menu/${id}/details-exams/${idExams}`
    })
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
        return <img className='w-[50px]' loading='lazy' crossOrigin='anonymous' src={`${url}${img}`} />
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
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right')
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <div>
      <>
        <Drawer
          title='Create a new exams'
          width={820}
          onClose={onClose}
          open={open}
          extra={
            <Space>
              <Button onClick={() => setShowExcel(!showExcel)}>{showExcel ? 'Add Exams' : 'import excels'}</Button>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          {showExcel ? (
            <DetailsDsEasy />
          ) : (
            <Form layout='vertical' hideRequiredMark>
              <Row gutter={22}>
                <Col span={22}>
                  <Form.Item
                    name='name'
                    label={<p className='font-bold text-xl'>Tên Phòng Ban</p>}
                    rules={[{ required: true, message: 'vui lòng nhập Tên Phòng Ban ...!' }]}
                  >
                    <Input className='ml-7 rounded-md ' placeholder='vui lòng nhập Tên Phòng Ban ...!' />
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
          )}
        </Drawer>
      </>
      <div>
        <button
          type='submit'
          className='my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-sm tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
        >
          Bộ Đề Thi
          {/* {data?.data.name} */}
        </button>
      </div>
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
              onConfirm={handelDropDbExmams}
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
          <div
            onClick={showDrawer}
            className={` bg-white h-[40px]  flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl hover:text-white hover:bg-warning rounded-md float-right  tracking-wide cursor-pointer  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600  transition ease-in duration-300`}
          >
            <Tooltip title='Thêm Câu Hỏi'>
              <div className='text-base font-medium text-black  flex items-center gap-4'>
                <span>
                  <PiKeyReturnThin className='text-xl text-danger' />
                </span>
                <span> Thêm Câu Hỏi</span>
              </div>
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
        <Footer className='mt-5 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
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
