import { Col, DatePicker, Divider, Drawer, Form, Input, Row, Skeleton, Space, Table } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from '~/components'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { useGetAllLoggersQuery, useRemoveLoggersMutation } from '~/apis/checklogs/loggersAPi'
import Pagination from '../roles/Pagination'
import InputNumber from '~/components/inputNumber'
import { Footer } from 'antd/es/layout/layout'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { RangePickerProps } from 'antd/es/date-picker'
import { setLoggerDate } from '~/store/slice/dateLogger.slice'
import { ClientSocket } from '~/socket/socket'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import ChilTableLogs from './ChilTableLogs'
const CheckLog = () => {
  const [queryParameters] = useSearchParams()
  const [removeLogger] = useRemoveLoggersMutation()
  const [datalimitQuery, setDatalimitQuery] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const search: string | null = queryParameters.get('search')
  const [open, setOpen] = useState(false)
  const { loggerDate } = useAppSelector((state) => state.loggers)
  const queryConfig = useQueryConfig()
  const {
    data: dataLoggers,
    isFetching,
    isLoading
  } = useGetAllLoggersQuery({
    page: dataPageQuery || 1,
    limit: datalimitQueryChange || 30,
    startDate: loggerDate?.startDate,
    endDate: loggerDate?.endDate,
    search: search || ''
  })
  const onFinish = ({ code }: { code: string }) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: code
      }).toString()
    })
  }
  const onFinishRemoveLoger = ({ days }: { days: any }) => {
    removeLogger({
      time: Number(days)
    })
      .unwrap()
      .then(() => toastService.success('settings days removed loger'))
      .catch(() => toastService.error('error'))
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDatalimitQuery(event.target.value)
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
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  type FieldType = {
    username?: string
    code?: string
    remember?: string
  }
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
    dispatch(setLoggerDate({ startDate: dateString[0], endDate: dateString[1] }))
    navigate({
      search: createSearchParams({
        ...queryConfig,
        startDate: dateString[0],
        endDate: dateString[1]
      }).toString()
    })
  }
  const dataSource = dataLoggers?.docs.map(
    ({ user, logType, contents, ipAddress, data, createdAt, endDate }: any, index: number) => ({
      key: index + 1,
      user: user,
      logType: logType,
      contents: contents,
      data: data,
      ipAddress: ipAddress,
      createdAt: createdAt,
      endDate: endDate
    })
  )
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: 'LogType',
      dataIndex: 'logType',
      key: 'logType',
      render: (text: string) => {
        console.log(text)
        let colorType = ''
        if (text.toLowerCase() == 'update') {
          colorType = 'text-warning font-bold text-md'
        } else if (text.toLowerCase() == 'create') {
          colorType = 'text-success font-bold text-md'
        } else if (text.toLowerCase() == 'delete') {
          colorType = 'text-danger font-bold text-md'
        }
        return <p className={colorType}>{text}</p>
      }
    },
    {
      title: 'Contents',
      dataIndex: 'contents',
      key: 'contents'
    },
    {
      title: 'Code',
      dataIndex: 'user',
      key: 'user'
    },
    {
      title: 'Author',
      dataIndex: 'ipAddress',
      key: 'ipAddress'
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data: string) => {
        return <p>{data.split('T')[0]}</p>
      }
    },
    {
      title: <p className='text-danger font-medium'>Ngày xóa</p>,
      dataIndex: 'endDate',
      key: 'endDate',
      render: (data: string) => {
        return <p className='text-black font-bold'>{data.split('T')[0]}</p>
      }
    }
  ]
  return (
    <div>
      <Drawer
        title='Create services Log'
        width={820}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button styleClass='bg-success' onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <Form
          onFinish={onFinishRemoveLoger}
          layout='vertical'
          hideRequiredMark
          autoComplete='off'
          initialValues={{ remember: true }}
        >
          <Row gutter={22}>
            <Col span={22}>
              <Form.Item
                name='days'
                label={<p className='font-bold text-xl'>Số ngày lưu Log hệ thống</p>}
                rules={[{ required: true, message: 'services Logn ...!' }]}
              >
                <InputNumber className='ml-7 rounded-md ' placeholder='Số ngày lưu Log hệ thống ...!' />
              </Form.Item>
            </Col>
          </Row>
          <Button type='submit' styleClass='rounded-sm bg-success  w-full'>
            Submit
          </Button>
        </Form>
      </Drawer>
      <Breadcrumb pageName='check logs' />
      <Divider orientation='left'>Bộ Lọc</Divider>
      <Form
        name='basic'
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 900, display: 'flex', justifyContent: 'start' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item label='ngày'>
          <DatePicker.RangePicker onChange={onDateChange} />
        </Form.Item>
        <Form.Item<FieldType>
          label=' Code'
          name='code'
          rules={[{ required: true, message: 'Please input your Author Code!' }]}
        >
          <Input placeholder='Author Code' prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button styleClass='py-2' type='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation='left'></Divider>
      <div className='flex justify-between '>
        <div className='flex items-center gap-5 mt-4'>
          <div style={{ textDecoration: 'underline' }} className='text-md'>
            số bản ghi
          </div>
          <div className='flex items-center gap-5 mt-4'>
            <InputNumber
              className=''
              classNameError='hidden'
              classNameInput='h-8 w-50 border-t border-b border-gray-300 p-1 text-center outline-none'
              onChange={handleChange}
              value={datalimitQuery}
            />
            <Button styleClass='py-1 px-1 hover:bg-opacity-80' onClick={handleClick}>
              Áp dụng
            </Button>
          </div>
        </div>
        <div className='flex items-end gap-2 '>
          <Button onClick={showDrawer} styleClass='py-1 px-1'>
            <SettingOutlined /> services Log
          </Button>
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
        <Table className='mt-5' dataSource={dataSource} columns={columns} pagination={false} bordered />
      )}
      <div>
        <Footer className='mt-5 flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
          </div>
          <div>
            <Pagination pageSize={dataLoggers?.totalPages} queryConfig={queryConfig} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default CheckLog
