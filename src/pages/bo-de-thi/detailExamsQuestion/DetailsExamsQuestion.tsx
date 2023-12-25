import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from '~/components'
import {
  Checkbox,
  DatePicker,
  Divider,
  Drawer,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Skeleton,
  Space,
  Table,
  Tag
} from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEditTopicExamIdMutation, useGetTopicExamsIDQuery } from '~/apis/examSetting/examSetting'
import DeleteIcon from '~/components/Icons/DeleteIcon'
import MemberDepartment from '~/layouts/otherAdmin/MemberDepartment'
import { toastService } from '~/utils/toask/toaskMessage'
type FieldType = {
  keyword?: string
}
interface DataType {
  key: React.Key
  point: string
  results: string
  age: number
  address: string
  question: string[]
}
const DetailsExamsQuestion = () => {
  const [open, setOpen] = useState(false)
  const [checkExaminer, setCheckExaminer] = useState(false)
  const [checkMember, setCheckMember] = useState(true)
  const [queryParameters] = useSearchParams()
  const search: string | null = queryParameters.get('search')
  const [editTopexamsId] = useEditTopicExamIdMutation()
  const { pathname } = useLocation()
  const checkPath = pathname.includes('edit')
  const [dataToSend, setDataToSend] = useState<any[]>([])
  const showDrawer = (num: string) => {
    setOpen(true)
    if (num === '1') {
      setCheckExaminer(true)
    } else {
      setCheckExaminer(false)
    }
  }
  const onClose = () => {
    setOpen(false)
    setCheckMember(true)
  }
  const { Column, ColumnGroup } = Table
  const { id } = useParams()
  const uri = import.meta.env.VITE_API

  const navigate = useNavigate()
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useGetTopicExamsIDQuery({
    id: id as string,
    search: search || ''
  })
  console.log(dataIdExmasDetails)
  const [secretKey, setSecretKey] = useState('')
  const [dataExamsEdit, setDataExamsEdit] = useState({
    name: '',
    status: '',
    startDate: '',
    endDate: '',
    time: '',
    idQuestion: [],
    users: {
      add: [],
      remove: [] as string[]
    },
    examiner: {
      add: [],
      remove: [] as string[]
    }
  })
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    setDataExamsEdit({
      ...dataExamsEdit,
      startDate: dateString[0],
      endDate: dateString[1]
    })
  }
  const dateFormat = 'YYYY/MM/DD'
  const data: DataType[] = dataIdExmasDetails?.data?.question.map((items: any) => {
    console.log(items)
    return {
      key: items._id,
      question: items.question,
      image: items.image,
      point: items.point,
      results: items.answer,
      questionA: items.choose
    }
  })
  const dataSourceUser = dataIdExmasDetails?.data?.user?.map((items: any) => ({
    key: items._id,
    code: items.employeeCode,
    username: items.username,
    avatar: items.avatar
  }))
  const dataSourcExaminer = dataIdExmasDetails?.data?.examiner?.map((items: any) => ({
    key: items._id,
    code: items.employeeCode,
    username: items.username,
    avatar: items.avatar
  }))
  const confirm = (id: string) => {
    console.log(id)
    if (checkExaminer) {
      setDataExamsEdit({
        ...dataExamsEdit,
        examiner: {
          ...dataExamsEdit.examiner,
          remove: [...dataExamsEdit.examiner.remove, id] as string[]
        }
      })
    } else {
      setDataExamsEdit({
        ...dataExamsEdit,
        users: {
          ...dataExamsEdit.users,
          remove: [...dataExamsEdit.users.remove, id] as string[]
        }
      })
    }
  }
  const onChange = (id: any) => {
    const index = dataToSend.indexOf(id)
    if (index === -1) {
      setDataToSend([...dataToSend, id])
    } else {
      setDataToSend(dataToSend.filter((item) => item !== id))
    }
  }
  const columnsUser = [
    {
      title: 'code',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: 'ảnh',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (items: string) => {
        return <img className='w-[55px]' src={`${uri}${items}`} alt='avatar' />
      }
    },
    {
      title: <p>{checkPath ? 'tác vụ' : ''}</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <>
            {checkPath ? (
              <Popconfirm
                title='Delete the member'
                description='Are you sure to delete this member?'
                okButtonProps={{
                  style: { backgroundColor: 'blue', marginRight: '20px' }
                }}
                onConfirm={() => confirm(id)}
                okText='Yes'
                cancelText='No'
              >
                <Button styleClass='!py-0 !px-2  flex items-center '>
                  <span>
                    <DeleteIcon />
                  </span>
                  <Button styleClass=''>xóa</Button>
                </Button>
              </Popconfirm>
            ) : (
              ''
            )}
          </>
        )
      }
    }
  ]
  const onNameChange = (e: any) => {
    setDataExamsEdit({
      ...dataExamsEdit,
      name: e.target.value
    })
  }
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        search: keywordSpace
      }).toString()
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        search: ''
      }).toString()
    })
  }
  const handleDataFromChild = (data: any) => {
    if (data) setOpen(false)
    console.log(data)
    if (checkExaminer) {
      setDataExamsEdit({
        ...dataExamsEdit,
        examiner: {
          ...dataExamsEdit.examiner,
          add: data
        }
      })
    } else {
      setDataExamsEdit({
        ...dataExamsEdit,
        users: {
          ...dataExamsEdit.users,
          add: data
        }
      })
    }
  }
  const [form] = Form.useForm()
  useEffect(() => {
    console.log(dataIdExmasDetails)
    form.setFieldsValue({
      name: dataIdExmasDetails?.data?.name,
      price: dataIdExmasDetails?.price,
      time: dataIdExmasDetails?.data?.time
    })
  }, [dataIdExmasDetails, form])
  const handelSaveEdit = () => {
    editTopexamsId({
      id,
      name: dataExamsEdit.name || dataIdExmasDetails?.data?.name,
      status: dataExamsEdit.status || 'active',
      startDate: dataExamsEdit.startDate || dataIdExmasDetails?.data?.startDate,
      endDate: dataExamsEdit.endDate || dataIdExmasDetails?.data?.endDate,
      idQuestion: dataToSend || [],
      time: dataExamsEdit.time || dataIdExmasDetails?.data?.time,
      examinerAdd: dataExamsEdit.examiner.add || [],
      examinerRemove: dataExamsEdit.examiner.remove || [],
      add: dataExamsEdit.users.add || [],
      remove: dataExamsEdit.users.remove || [],
      secretKey: secretKey || ''
    })
      .unwrap()
      .then(() => {
        toastService.success('update success')
        setTimeout(() => {
          window.location.reload()
        }, 400)
      })
      .catch(() => {
        toastService.error('update failed')
      })
  }
  function makeid() {
    const length = 10
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    if (result != '') setSecretKey(result)
    console.log(result, secretKey)
    return result
  }

  if (isLoadingDetails || isFetchingDetails) return <p>loading.....</p>
  return (
    <div className='w-full'>
      <Drawer width={900} title='danh sách người thi' placement='right' onClose={onClose} open={open}>
        {checkMember ? (
          <div className=''>
            <Form
              className='flex gap-5  '
              name='basic'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 800 }}
              initialValues={{ remember: true }}
              autoComplete='off'
            >
              <Form.Item<FieldType> name='keyword' rules={[{ required: true, message: 'Please input your code!' }]}>
                <Input className='h-[40px] w-[300px] 2xl:w-[450px] border border-[#ccc]' placeholder='Tìm Kiếm ....' />
              </Form.Item>
              <Button type='submit' id='keycode13' styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'>
                Tìm Kiếm
              </Button>
              {checkPath && (
                <Button
                  onClick={() => setCheckMember(false)}
                  type='button'
                  id='keycode13'
                  styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'
                >
                  Thêm Mới
                </Button>
              )}
            </Form>
            <Table
              dataSource={checkExaminer ? dataSourcExaminer : dataSourceUser}
              columns={columnsUser}
              pagination={false}
            />
          </div>
        ) : (
          <MemberDepartment checkMember={true} sendDataToParent={handleDataFromChild} />
        )}
      </Drawer>
      <div className=' mt-15 flex justify-center items-center w-1/3 gap-5'>
        <Button onClick={() => navigate(-1)} styleClass='py-2  bg-[#24A19C]'>
          Quay Lại
        </Button>
        {checkPath && (
          <Button onClick={handelSaveEdit} styleClass='bg-success px-5 py-2'>
            Lưu
          </Button>
        )}
      </div>
      <Divider orientation='left'>Chi Tiết Đề Thi</Divider>
      {isLoadingDetails ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div>
          <Form autoComplete='off' form={form} className=' gap-10 grid grid-cols-2'>
            <div>
              <p>Tên Bài Thi</p>
              <Form.Item name='name'>
                <Input
                  onChange={onNameChange}
                  className='h-[32px] border mt-2 border-[#d9d9d9] text-black font-medium  w-[400px] rounded-md'
                  size='large'
                  placeholder='large size'
                />
              </Form.Item>
            </div>
            {checkPath ? (
              <div>
                <p> Hiệu lực trong</p>
                <Form.Item name='date'>
                  <DatePicker.RangePicker className='mt-2' onChange={onDateChange} />
                </Form.Item>
              </div>
            ) : (
              <div className='flex items-center justify-between'>
                <div>
                  <span className='text-black text-md font-medium'>ngày bắt đầu :</span>{' '}
                  <span className='text-md'>{dataIdExmasDetails?.data?.startDate.split('T')[0]}</span>
                </div>
                <div>
                  <span className='text-black text-md font-medium'>ngày kết thúc :</span>{' '}
                  <span className='text-md'>{dataIdExmasDetails?.data?.endDate.split('T')[0]}</span>{' '}
                </div>
              </div>
            )}

            <div>
              <p>Thời Gian(phút) </p>
              <Form.Item name='time'>
                <Input
                  className='h-[32px] w-[400px] border !border-[#ccc] mt-2 rounded-md'
                  onChange={(event) =>
                    setDataExamsEdit({
                      ...dataExamsEdit,
                      time: event.target.value
                    })
                  }
                  size='large'
                />
              </Form.Item>
            </div>
            <div className={`${dataIdExmasDetails?.data?.secret_key !== '' ? 'flex items-center' : ''}`}>
              {checkPath && (
                <div className=''>
                  {dataIdExmasDetails?.data?.secret_key && dataIdExmasDetails?.data?.secret_key !== '' ? (
                    <div className='flex items-center gap-8'>
                      <p>mã bảo mật </p>
                      <p className='font-bold text-xl'>{dataIdExmasDetails?.data?.secret_key}</p>
                    </div>
                  ) : (
                    <div>
                      <p>Mã bảo mật secretKey </p>
                      <Button
                        onClick={makeid}
                        styleClass='!px-0 rounded-md  w-[289px] bg-[#ec971f] border border[#d58512] py-1.5  mt-1'
                      >
                        generate Secret key
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Form>
          <div className='mt-5'>
            <Divider orientation='left'>danh sách người chấm thi</Divider>
            <Button onClick={() => showDrawer('1')} styleClass='py-2 bg-warning'>
              xem dánh sách
            </Button>
          </div>
          <div className='mt-5'>
            <Divider orientation='left'>danh sách người thi</Divider>
            <Button onClick={() => showDrawer('0')} styleClass='py-2'>
              xem dánh sách
            </Button>
          </div>
          <div className='border-b mt-10 border-[#d9d9d9] mb-5'>
            <Divider orientation='left' plain>
              <p> Câu Hỏi</p>
            </Divider>
            <div className='flex w-full justify-center'>
              <Table className='w-full overflow-x-auto' dataSource={data} pagination={false}>
                <ColumnGroup className='' title={<p className='border-b border-[#ccc]'>questions</p>}>
                  <Column
                    title='Câu Hỏi'
                    dataIndex='question'
                    key='question'
                    render={(data: string) => <p>{data?.length > 20 ? `${data?.slice(0, 20)}...` : data}</p>}
                  />
                  <Column
                    title={<p className='flex justify-center'>Ảnh</p>}
                    dataIndex='image'
                    key='image'
                    className='border-r border-[#ccc]'
                    render={(image: string[]) => (
                      <>
                        {image.map((tag) => {
                          console.log(tag)
                          return <Image key={tag} width={50} src={`${uri}/${tag}`}></Image>
                        })}
                      </>
                    )}
                  />
                </ColumnGroup>
                <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án</p>}>
                  <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án A</p>}>
                    <Column
                      title={<p className='flex justify-center'>A</p>}
                      dataIndex='questionA'
                      key='questionA'
                      render={(questionA: any) => {
                        console.log(questionA[0], 'ab')
                        return (
                          <p>
                            {questionA[0]?.q?.toString()?.length > 20
                              ? `${questionA[0].q.slice(0, 20)}...`
                              : questionA[0].q}
                          </p>
                        )
                      }}
                    />
                    <Column
                      title='Ảnh'
                      dataIndex='questionA'
                      className='border-r border-[#ccc]'
                      key='questionA'
                      render={(questionA: any) => {
                        return (
                          <>{questionA[0]?.img && <Image width={50} src={`${uri}/${questionA[0]?.img}`}></Image>}</>
                        )
                      }}
                    />
                  </ColumnGroup>
                  <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án B</p>}>
                    <Column
                      title={<p className='flex justify-center'>B</p>}
                      dataIndex='questionA'
                      key='questionA'
                      render={(questionA: any) => (
                        <p>
                          {questionA[1]?.q?.toString()?.length > 20
                            ? `${questionA[1].q.slice(0, 20)}...`
                            : questionA[1].q}
                        </p>
                      )}
                    />
                    <Column
                      title='Ảnh'
                      dataIndex='questionA'
                      key='questionA'
                      className='border-r border-[#ccc]'
                      render={(questionA: any) => {
                        return <>{questionA[1].img && <Image width={50} src={`${uri}/${questionA[1]?.img}`}></Image>}</>
                      }}
                    />
                  </ColumnGroup>
                  <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án C</p>}>
                    <Column
                      title={<p className='flex justify-center'>C</p>}
                      dataIndex='questionA'
                      key='questionA'
                      render={(questionA: any) => (
                        <p>
                          {questionA[2]?.q?.toString()?.length > 20
                            ? `${questionA[2].q.slice(0, 20)}...`
                            : questionA[2].q}
                        </p>
                      )}
                    />
                    <Column
                      title='Ảnh'
                      className='border-r border-[#ccc]'
                      dataIndex='questionA'
                      key='questionA'
                      render={(questionA: any) => {
                        return <>{questionA[2].img && <Image width={50} src={`${uri}/${questionA[2]?.img}`}></Image>}</>
                      }}
                    />
                  </ColumnGroup>
                  <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án D</p>}>
                    <Column
                      title={<p className='flex justify-center'>D</p>}
                      dataIndex='questionA'
                      key='questionA'
                      render={(questionA: any) => (
                        <p>
                          {questionA[3]?.q?.toString()?.length > 20
                            ? `${questionA[3]?.q?.slice(0, 20)}...`
                            : questionA[3].q}
                        </p>
                      )}
                    />
                    <Column
                      title='Ảnh'
                      dataIndex='questionA'
                      className='border-r border-[#ccc]'
                      key='questionA'
                      render={(questionA: any) => {
                        return <>{questionA[3].img && <Image width={50} src={`${uri}/${questionA[3]?.img}`}></Image>}</>
                      }}
                    />
                  </ColumnGroup>
                </ColumnGroup>
                <ColumnGroup title={<p className=' border-[#ccc]'></p>}>
                  <ColumnGroup title={<p className='border-b border-[#ccc]'>Điểm</p>}>
                    <Column
                      className='border-r border-[#ccc]'
                      title='Đáp Án Đúng'
                      dataIndex='results'
                      key='results'
                      render={(result: any) => {
                        return <>{<p className='flex justify-center'>{result}</p>}</>
                      }}
                    />
                    <Column
                      className='border-r border-[#ccc]'
                      title='Điểm Số'
                      dataIndex='point'
                      key='point'
                      render={(point: any) => {
                        return <>{<p className='flex justify-center'>{point}</p>}</>
                      }}
                    />
                  </ColumnGroup>
                </ColumnGroup>

                <Column
                  className='!w-[115px]'
                  title={<p className=''>Action</p>}
                  key='action'
                  render={({ key: id }: { key: string }) => {
                    return (
                      <div>
                        <p
                          onClick={() =>
                            navigate({
                              pathname: `/details-exams/${id}`
                            })
                          }
                          className='text-success font-medium underline '
                        >
                          chi tiết
                        </p>
                        {checkPath ? (
                          <div className='flex items-center mt-3 gap-2'>
                            <Checkbox checked={dataToSend.includes(id)} onChange={() => onChange(id)}>
                              <p className='text-danger font-semibold underline'>xóa</p>
                            </Checkbox>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    )
                  }}
                />
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailsExamsQuestion
