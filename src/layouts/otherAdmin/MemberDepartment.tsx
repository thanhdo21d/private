import { Checkbox, Col, Drawer, Form, Image, Input, Popconfirm, Row, Skeleton, Space, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import axios from 'axios'
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetIdUserDepartMentQuery, useRemoveUserDepartMentMutation } from '~/apis/userDepartMent/userDepartment'
import { Button, EmailIcon } from '~/components'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import Pagination from '~/pages/roles/Pagination'
import { toastService } from '~/utils/toask/toaskMessage'
import InsertMember from './InsertMember'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useAppDispatch } from '~/store/root/hook'
type FieldType = {
  code?: string
}
const MemberDepartment = ({ checkMember, sendDataToParent }: { checkMember?: boolean; sendDataToParent?: any }) => {
  const dispatch = useAppDispatch()
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const [dataToSend, setDataToSend] = useState<any[]>([])
  const idCate = localStorage.getItem('idCategories')
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const [removeUserDepartment] = useRemoveUserDepartMentMutation()
  const search: string | null = queryParameters.get('search')
  const [open, setOpen] = useState(false)
  const uri = import.meta.env.VITE_API
  const [checkExcel, setCheckExcel] = useState(false)
  const {
    data: dataUserDepartments,
    isFetching: userFetching,
    isLoading: userLoading
  } = useGetIdUserDepartMentQuery({
    id: idCate,
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 20,
    search: search || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onFinish = ({ code }: any) => {
    console.log(code)
    const keywordSpace = code.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: keywordSpace
      }).toString()
    })
  }
  const confirm = (idUser: string) => {
    console.log(idUser)
    removeUserDepartment({
      id: idCate,
      idUser: [idUser]
    })
      .unwrap()
      .then(() => toastService.success('Delete success'))
      .catch(() => toastService.error('Error deleting'))
  }
  const sendDataToParentProps = () => {
    sendDataToParent(dataToSend)
  }
  const onChange = (id: any) => {
    const index = dataToSend.indexOf(id)
    if (index === -1) {
      setDataToSend([...dataToSend, id])
    } else {
      setDataToSend(dataToSend.filter((item) => item !== id))
    }
  }
  const toggleSelectAll = () => {
    if (selectAllChecked) {
      setDataToSend([])
    } else {
      const allIds = dataSource.map((item: any) => item.key)
      setDataToSend(allIds)
    }
    setSelectAllChecked(!selectAllChecked)
  }
  const dataSource = dataUserDepartments?.data?.users?.map(
    ({
      _id,
      employeeCode,
      email,
      username,
      avatar
    }: {
      _id: string
      employeeCode: string
      email: string
      username: string
      avatar: string
    }) => ({
      key: _id,
      employeeCode: employeeCode,
      email: email,
      username: username,
      avatar: avatar
    })
  )
  const columns = [
    {
      title: 'Code',
      dataIndex: 'employeeCode',
      key: 'employeeCode',
      render: (code: string) => {
        return <p className='font-bold '>{code}</p>
      }
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => {
        return <div>{avatar !== '' ? <Image className='!w-[50px]  rounded-sm' src={`${uri}${avatar}`} /> : ''}</div>
      }
    },
    {
      title: <p className='flex justify-center'>Tác Vụ</p>,
      render: ({ key: id }: { key: string }) => (
        <div className='flex justify-center space-x-2'>
          {checkMember ? (
            <Checkbox checked={dataToSend.includes(id)} onChange={() => onChange(id)}>
              chọn
            </Checkbox>
          ) : (
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
              <Button styleClass='bg-danger flex items-center w-fit w-[100px]'>
                <span>
                  <DeleteIcon />
                </span>
                <span className='font-medium'> Xóa</span>
              </Button>
            </Popconfirm>
          )}
        </div>
      )
    }
  ]
  const url = import.meta.env.VITE_API
  const [file, setFile] = useState<any>(null)
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0])
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    setIsLoading(true)
    try {
      const response = await axios.post(`${url}import/user/${idCate}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toastService.success(' uploading file successfully')
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      toastService.error('Error uploading file')
      setIsLoading(false)
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
    <div>
      <Drawer
        title='Thêm Mới Thành Viên'
        width={920}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {checkExcel ? (
          <div>
            <div
              className='relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover '
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)'
              }}
            >
              <div className='absolute bg-black opacity-60 inset-0 z-0' />
              <div className='sm:max-w-lg w-full p-10 bg-white rounded-xl z-10'>
                <div className='text-center'>
                  <h2 className='mt-5 text-3xl font-bold text-gray-900'>File Upload!</h2>
                  <p className='mt-2 text-sm text-gray-400'>Lorem ipsum is placeholder text.</p>
                </div>
                <form onSubmit={handleSubmit} className='mt-8 space-y-3'>
                  <div className='grid grid-cols-1 space-y-2'>
                    <label className='text-sm font-bold text-gray-500 tracking-wide'>Title</label>
                    <input
                      onChange={handleFileChange}
                      className='text-base  p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500'
                      type='file'
                      id='clmm-title_modal'
                      placeholder='mail@gmail.com'
                    />
                  </div>
                  {isLoading ? (
                    <div className='loader'></div>
                  ) : (
                    <div className='grid grid-cols-1 space-y-2'>
                      <label className='text-sm font-bold text-gray-500 tracking-wide'>Attach Document</label>
                      <div className='flex items-center justify-center w-full '>
                        <label className='flex  cursor-pointer flex-col rounded-lg border-4 border-dashed w-full h-70 p-10 group text-center'>
                          <div className='h-full w-full text-center flex flex-col mt-7 items-center justify-center  '>
                            <div className='flex flex-auto max-h-48 w-2/5 mx-auto -mt-10'>
                              <img
                                className='has-mask h-36 object-center animate-bounce rounded-lg'
                                src='https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg'
                                alt='freepik image'
                              />
                            </div>
                            <p className='pointer-none text-gray-500 '>
                              <span className='text-sm'>Drag and drop</span> files here <br /> or{' '}
                              <a className='text-blue-600 hover:underline'>select a file</a> from your computer
                            </p>
                          </div>
                          <input
                            type='file'
                            className='hidden'
                            onChange={handleFileChange}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault()
                              const files = Array.from(e.dataTransfer.files)
                              console.log(files)
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                  <p className='text-sm text-gray-300'>
                    <span>File type: Excel</span>
                  </p>
                  <div>
                    <button
                      type='submit'
                      className='my-5 w-full btn flex justify-center bg-blue-500 text-gray-100 p-4 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <InsertMember />
        )}
      </Drawer>
      {!checkMember && (
        <div className='flex space-x-2'>
          <Button
            styleClass='bg-warning'
            onClick={() => {
              showDrawer()
              return setCheckExcel(false)
            }}
          >
            Thêm mới
          </Button>
          <Button
            styleClass='bg-success'
            onClick={() => {
              showDrawer()
              return setCheckExcel(true)
            }}
          >
            Thêm mới Từ Excel
          </Button>
        </div>
      )}

      <div className='mt-10 flex gap-5'>
        <Form
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='flex gap-5  justify-center'
        >
          <Form.Item<FieldType> name='code' rules={[{ required: true, message: 'vui lòng nhập code nhân viên ...!' }]}>
            <Input
              className={`h-[50px] ${checkMember ? 'w-[300px]' : 'w-[600px]'} `}
              placeholder='Tìm Kiếm Theo Code ....'
            />
          </Form.Item>
          <Button type='submit' styleClass='w-[150px] h-[50px] bg-graydark'>
            Tìm Kiếm
          </Button>
          {checkMember && (
            <>
              <Button type='button' styleClass='w-[150px] h-[50px] !px-0 bg-graydark' onClick={toggleSelectAll}>
                {selectAllChecked ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
              </Button>
              <Button onClick={sendDataToParentProps} type='button' styleClass='w-[150px] h-[50px] !px-0 bg-success'>
                xác nhận
              </Button>
            </>
          )}
        </Form>
      </div>
      <hr className='mt-5' />
      {userFetching || userLoading ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='mt-2'>
          <Table dataSource={dataSource} pagination={false} columns={columns} />
          <div className='mt-5 float-right'>
            <Pagination pageSize={dataUserDepartments?.totalPages} queryConfig={queryConfig} />
          </div>
        </div>
      )}
      <Footer className='mt-5 w-full  justify-between dark:bg-black'>
        <div className='text-md font-semibold text-center dark:text-white'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
      </Footer>
    </div>
  )
}

export default MemberDepartment
