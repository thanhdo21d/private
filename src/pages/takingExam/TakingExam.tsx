import { Footer } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import Pagination from '../roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import { Breadcrumb, Button } from '~/components'
import { Divider, Form, Input, Popconfirm, Skeleton, Table, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllUserStartExamsQuery, useUpdateStatusExamsUserMutation } from '~/apis/topicQuestion/topicQuestion'
import startButton from '../../assets/start-button.png'
import stopButton from '../../assets/stop.png'
import addTime from '../../assets/time.png'
import { toastService } from '~/utils/toask/toaskMessage'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { startExam, stopExam } from '~/store/slice/errorExam'
import io from 'socket.io-client'

const TakingExam = () => {
  const socket = io('http://localhost:8282', {
    transports: ['websocket', 'pulling', 'flashsocket']
  })
  useEffect(() => {
    socket.connect()
    socket.on('examStarted', (data) => {
      message.success(`nhân viên ${data?.user} đã bắt đầu thi`)
    })
    socket.on('examStarted:already', (data) => {
      message.warning(`nhân viên ${data?.user} đã vào lại thi`)
    })
    socket.on('examSubmit', (data) => {
      console.log(data, 'da')
      message.success(`nhân viên ${data?.user} đã vào nộp bài`)
    })
    return () => {
      socket.off('examStarted')
      socket.disconnect()
    }
  }, [])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [queryParameters] = useSearchParams()
  const search: string | null = queryParameters.get('search')
  const queryConfig = useQueryConfig()
  const [updateStatusExam] = useUpdateStatusExamsUserMutation()
  const { statusError } = useAppSelector((state) => state.updateStatusExam)
  console.log(statusError)
  const uri = import.meta.env.VITE_API
  const {
    data: dataUserStart,
    isLoading,
    isFetching
  } = useGetAllUserStartExamsQuery({
    searchQuery: search as string
  })
  const onFinish = ({ code }: { code: string }) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: code
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
  const confirmUpdate = ({ id: idSession, num }: { id: string; num: string }) => {
    updateStatusExam({
      id: idSession,
      status: num
    })
      .unwrap()
      .then((data: any) => {
        if (data.message) toastService.success(num == '1' ? 'Đã tạm dừng bài thi' : 'Bài thi đã hoạt động')
      })
      .catch((error) => toastService.error('error updating '))
  }
  const dataSource = dataUserStart?.map((items: any) => ({
    key: items._id,
    code: items.user?.employeeCode,
    name: items.user?.username,
    avatar: items.user?.avatar,
    Endtime: items?.Endtime2,
    status: items?.status
  }))
  const columns = [
    {
      title: 'Code ',
      dataIndex: 'code',
      key: 'code',
      width: '12%'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      width: '12%',
      render: (avt: string) => {
        return <img className='w-[68px]' src={`${uri}${avt}`} />
      }
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'Endtime',
      key: 'Endtime'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        return (
          <p className={`${status == '1' ? 'font-bold text-xl text-danger' : 'font-bold text-xl text-success'}`}>
            {status == '1' ? 'Tạm dừng' : 'Đang thi'}
          </p>
        )
      }
    },
    {
      title: <p className='flex justify-center '>Tác vụ</p>,
      render: ({ key: id, status }: { key: string; status: string }) => {
        return (
          <div className='flex justify-center items-center gap-5'>
            <div>
              <Popconfirm
                title='Delete the task'
                description='Are you sure to delete this task?'
                onConfirm={() => confirmUpdate({ id: id, num: '0' })}
                okButtonProps={{
                  style: { backgroundColor: 'blue' }
                }}
                okText='Yes'
                cancelText='No'
              >
                <img className='w-[55px] hover:scale-105 ease-linear cursor-pointer' src={startButton} alt='start' />
              </Popconfirm>
            </div>
            <div>
              <Popconfirm
                title='Delete the task'
                description='Are you sure to delete this task?'
                onConfirm={() => confirmUpdate({ id: id, num: '1' })}
                okButtonProps={{
                  style: { backgroundColor: 'blue' }
                }}
                okText='Yes'
                cancelText='No'
              >
                <img className='w-[55px]  hover:scale-105 ease-linear cursor-pointer' src={stopButton} alt='stop' />
              </Popconfirm>
            </div>
            <div>
              <img className='w-[55px]  hover:scale-105 ease-linear cursor-pointer tremble' src={addTime} alt='time' />
            </div>
          </div>
        )
      }
    }
  ]
  if (isLoading || isFetching)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div>
      <Breadcrumb pageName='Danh sách nhân viên đang thi' />
      <div className='mt-10'></div>
      <Divider orientation='left'>Danh sách</Divider>
      <div className='flex justify-end mr-10'>
        <Form
          name='basic'
          style={{ maxWidth: 900, display: 'flex', justifyContent: 'start' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item label=' Code' name='code' rules={[{ required: true, message: 'Please input your Author Code!' }]}>
            <Input placeholder='Author Code' prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 11 }}>
            <Button styleClass='py-1.5' type='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div>
        <Footer className='mt-5 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            Design by ThanhDo IS
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default TakingExam
