import { Popconfirm, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useGetIdDepartmentQuery } from '~/apis/department/department'
import { Button } from '~/components'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
const FormData = () => {
  const { pathname } = useLocation()
  const { id } = useParams()
  const { data, isFetching, isLoading } = useGetIdDepartmentQuery(id as string)
  const navigate = useNavigate()
  useEffect(() => {
    const button: any = document.getElementById('buttonmodal')
    const closebutton: any = document.getElementById('closebutton')
    const modal: any = document.getElementById('modal')
  })
  const confirm = () => {
    toastService.success('Click on Yes')
  }
  const cancel = () => {
    toastService.error('Click on No')
  }
  const dataSource = data?.data?.easy.map((items: any, index: number) => ({
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
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (img: string) => {
        return <img className='w-[50px]' crossOrigin='anonymous' src={`http://localhost:8282/${img}`} />
      }
    },
    {
      title: 'option',
      dataIndex: 'option',
      key: 'option',
      render: (text: string) => {
        return <p>{text}</p>
      }
    },
    {
      title: <p className='flex justify-center text-danger font-semibold text-xl'>actions</p>,
      render: () => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <Button
              onClick={() => modal.classList.add('scale-100')}
              id='buttonmodal'
              styleClass='focus:outline-none hover:bg-warning text-white bg-opacity-75 rounded-lg ring-4 ring-indigo-300'
              type='button'
            >
              Chit Tiết
            </Button>
            <Button onClick={() => navigate('/')}>Edit</Button>
            <Popconfirm
              title='Delete the task'
              description='Are you sure to delete this task?'
              okButtonProps={{
                style: { backgroundColor: 'blue', marginRight: '20px' }
              }}
              onConfirm={confirm}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'
            >
              <Button>Delete</Button>
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
      <div className='flex items-center justify-start gap-10 '>
        <div
          className={` ${
            pathname === '/admin/details/dethi/easy' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide   font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/easy'>
            Danh Sách Câu Hỏi Dễ
          </Link>
        </div>
        <div
          className={`${
            pathname === '/admin/details/dethi/hard' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/hard'>
            Danh Sách Câu Hỏi Khó
          </Link>
        </div>
        <div
          className={` ${
            pathname === '/admin/details/dethi/normal' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white rounded-md hover:bg-meta-4  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white' to='/admin/details/dethi/normal'>
            Danh Sách Câu Trung Bình
          </Link>
        </div>
        <div
          className={` ${
            pathname === '/admin/details' ? 'bg-body' : ' bg-[#001529]'
          } my-5 flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white hover:bg-warning rounded-md float-right  tracking-wide bg-[#001529]  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300`}
        >
          <Link className='text-xl font-bold text-white ' to='/admin/de-kho'>
            Quay Lại
          </Link>
        </div>
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
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        )}
        <div>
          <div
            id='modal'
            className='fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-boxdark z-50 bg-opacity-50 transform scale-0 transition-transform duration-300'
          >
            <div className='bg-white w-1/2 h-[80%] p-12 rounded-sm shadow-sm f'>
              <div className='flex items-center justify-between'>
                <div>
                  <button
                    onClick={() => modal.classList.remove('scale-100')}
                    id='closebutton'
                    type='button'
                    className='focus:outline-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8 animate-spin hover:scale-50 text-danger font-bold'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </button>
                </div>
                <div className=''>
                  <p className='text-2xl font-medium text-black'>Chi Tiết Câu Hỏi</p>
                </div>
                <div>
                  <button
                    onClick={() => modal.classList.remove('scale-100')}
                    id='closebutton'
                    type='button'
                    className='focus:outline-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8 animate-spin hover:scale-50 text-danger font-bold'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className='border-t border-black my-2'>
                <p className='pt-4'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus placeat maiores repudiandae, error
                  perferendis inventore aspernatur voluptatum omnis sint debitis!
                </p>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>question</th>
                      <th></th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Đáp Án</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>category question</td>
                      <td>Câu hỏi</td>
                      <td> Ảnh</td>
                    </tr>
                    <tr>
                      <td>category question</td>
                      <td>Câu hỏi</td>
                      <td> Ảnh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

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
