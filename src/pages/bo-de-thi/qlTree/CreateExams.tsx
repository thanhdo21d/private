import React, { useEffect, useState } from 'react'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import detailsIcons from '../../../assets/file.png'
import excelExport from '../../../assets/images/logo/excel2-svgrepo-com.svg'
import { Button } from '~/components'
import { Col, DatePicker, Divider, Drawer, Empty, Input, InputNumber, Row, Space, Table } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useCreateTopicExamsApiMutation } from '~/apis/topicQuestion/topicQuestion'
import { useGetCategoriesDepartmentsQuery } from '~/apis/category/categories'
import { useParams, useSearchParams } from 'react-router-dom'
import { CategoryTreeItem } from './Silbader'
import MemberDepartment from '~/layouts/otherAdmin/MemberDepartment'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { removeSelectedCategory, setDataCategoires } from '~/store/slice/checkCategories'
import { toastService } from '~/utils/toask/toaskMessage'
import { useGetHistoryCategoriesQuery } from '~/apis/question/ExamsEasy'
import TableChildrend from './Chiltable'

const CreateExams = () => {
  const [open, setOpen] = useState(false)
  const { categoriesData } = useAppSelector((state) => state.dataCategories)
  const { id } = useParams()
  const [dataExams, setDataExams] = useState({
    startDate: '',
    endDate: '',
    timeOut: 0,
    loopUp: null as null | number,
    name: ''
  })
  const [addQuestion, setAddQuestion] = useState(false)
  const [dataFromChild, setDataFromChild] = useState([])
  const [checkUser, setCheckUser] = useState(false)
  const [queryParameters] = useSearchParams()
  const dispatch = useAppDispatch()
  const searchKeyword: string | null = queryParameters.get('keyword')
  const idCate = localStorage.getItem('idCategories')
  const idHistory: string | null = queryParameters.get('history')
  const [createTopicExams, { isLoading: isCreateTopicExamsLoading }] = useCreateTopicExamsApiMutation()
  const {
    data: dataCategoriTree,
    isLoading,
    isFetching
  } = useGetCategoriesDepartmentsQuery({
    id: idCate as string,
    name: searchKeyword || ''
  })
  const { data: dataHistoryExams, isLoading: isHistoryLoading } = useGetHistoryCategoriesQuery(idHistory || '')
  console.log(dataHistoryExams)
  const [dataCategoriess, setDataCategories] = useState<any[]>([])
  const handleDataFromChild = (data: any) => {
    if (data) setOpen(false)
    setCheckUser(false)
    setDataFromChild(data)
    console.log(data)
  }
  useEffect(() => {
    const savedCategories = sessionStorage.getItem('categories')

    if (savedCategories) {
      setDataCategories(JSON.parse(savedCategories))
      console.log(dataCategoriess)
    } else {
      if (dataCategoriTree) {
        setDataCategories([dataCategoriTree])
        sessionStorage.setItem('categories', JSON.stringify([dataCategoriTree]))
      }
    }
  }, [idCate, dataCategoriTree])
  useEffect(() => {
    if (history) setAddQuestion(true)
  }, [])
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onChange = (value: number | null) => {
    console.log('changed', value)
  }
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    setDataExams({
      ...dataExams,
      startDate: dateString[0],
      endDate: dateString[1]
    })
  }
  console.log(categoriesData)
  const handelInsertExams = () => {
    const formattedCategoriesInfo = categoriesData.map((item) => ({
      categoryId: item.id,
      categoryName: item.name,
      questionSets: item.questionSets.map((set) => ({
        point: Number(set.point),
        count: Number(set.count)
      }))
    }))
    createTopicExams({
      id: id,
      name: dataExams.name,
      categoriesInfo: formattedCategoriesInfo,
      startDate: dataExams.startDate,
      endDate: dataExams.endDate,
      time: dataExams.timeOut,
      user: dataFromChild,
      loopQuestion: dataExams.loopUp || null
    })
      .unwrap()
      .then(() => toastService.success('created'))
      .catch(() => toastService.error('error'))
  }
  // useEffect(() => {
  //   if (idHistory) {
  //     dispatch(
  //       setDataCategoires({
  //         id: dataHistoryExams?.categoriesInfo?.map((items) => items.categoryId),
  //         name: dataHistoryExams?.categoriesInfo?.map((items) => items.categoryName),
  //         checked: true,
  //         questionSets: dataHistoryExams?.categoriesInfo?.map((items) => items.questionSets)
  //       })
  //     )
  //   }
  // }, [idHistory, dataHistoryExams?.categoriesInfo, dispatch])
  const orderProducts = categoriesData?.map((item: any, index: number) => ({
    key: item.id,
    id: item.id,
    index: index + 1,
    productName: item.name,
    questionSet: item.questionSets
  }))
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: 'name',
      dataIndex: 'productName',
      key: 'productName'
    },
    {
      title: 'tác vụ',
      render: (item: any) => {
        console.log(item)
        return (
          <div className='mx-2'>
            <img
              onClick={() => dispatch(removeSelectedCategory(item))}
              className='w-[30px] hover:scale-110 cursor-pointer'
              src={closeIcons}
              alt='close'
            />
          </div>
        )
      }
    }
  ]
  return (
    <>
      <Divider orientation='left'>Create Exams</Divider>
      {isHistoryLoading ? (
        <div> loading ..... </div>
      ) : (
        <div>
          <div className='2xl:flex gap-10 items-center justify-between'>
            <div className='2xl:flex grid grid-cols-3 gap-10 items-center'>
              <div>
                <p> Hiệu lực trong</p>
                <DatePicker.RangePicker className='mt-2' onChange={onDateChange} />
              </div>
              <div>
                <p className='2xl:text-center'>Thời Gian (phút) </p>
                <InputNumber
                  defaultValue={dataHistoryExams?.time}
                  onChange={(value) =>
                    setDataExams({
                      ...dataExams,
                      timeOut: value as number
                    })
                  }
                  className='h-[32px]  mt-2 rounded-md'
                  size='large'
                />
              </div>
              <div>
                <p className='2xl:text-center'> lặp lại </p>
                <InputNumber
                  defaultValue={Number(dataHistoryExams?.loopQuestion)}
                  onChange={(value) =>
                    setDataExams({
                      ...dataExams,
                      loopUp: value as number
                    })
                  }
                  className='h-[32px] mt-2 rounded-md'
                  size='large'
                />
              </div>
              <div>
                <p className='2xl:text-center'> danh sách user </p>
                <Button
                  onClick={() => {
                    setCheckUser(false)
                    showDrawer()
                  }}
                  styleClass='h-[32px] bg-success'
                >
                  Danh Sách
                </Button>
              </div>
              <div>
                <p className='2xl:text-center'> danh sách member </p>
                <img className='h-[35px] mt-2 rounded-md cursor-pointer hover:scale-110' src={`${excelExport}`} />
              </div>
            </div>
            <div className='mt-5 2xl:mt-0'>
              <Button> Lưu Tạm Thời </Button>
            </div>
          </div>
          <div className='mt-10'>
            <p>Tên Bài Thi</p>
            <Input
              defaultValue={dataHistoryExams?.name}
              onChange={(e) =>
                setDataExams({
                  ...dataExams,
                  name: e.target.value
                })
              }
              className='h-[32px] border mt-2 border-[#d9d9d9]  w-full rounded-md'
              size='large'
              placeholder='large size'
            />
          </div>
          <div className='border-b border-[#d9d9d9] mb-5'>
            <Divider orientation='left' plain>
              <p> Câu Hỏi</p>
            </Divider>
            <div className='flex justify-center'>
              <Empty
                imageStyle={{ height: 60 }}
                description={
                  <span>
                    Thêm <a>Câu Hỏi</a>
                  </span>
                }
              >
                <div className='w-fit h-fit mx-auto rounded-md mt-5 mb-5'>
                  <img
                    className='w-[40px] hover:scale-110 cursor-pointer'
                    src={addIcons}
                    alt='add'
                    onClick={() => setAddQuestion(!addQuestion)}
                  />
                </div>
              </Empty>
            </div>
          </div>
        </div>
      )}

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
        <div>
          <MemberDepartment checkMember={true} sendDataToParent={handleDataFromChild} />
        </div>
      </Drawer>
      {isLoading || isFetching ? (
        <div>loading .....</div>
      ) : (
        <>
          {addQuestion && (
            <div className='flex justify-between w-full mt-15 gap-10'>
              <div className='w-1/2 border border-[#24A19C] rounded-md min-h-screen relative shadow-lg'>
                <div className='flex justify-between items-center bg-[#24A19C] py-1'>
                  <h4 className='text-xl font-bold text-white pl-2'>Exams Question</h4>
                  <div className='w-[40px] h-[40px] mr-2 rounded-md shadow-xl bg-[#cae0e0] flex justify-center items-center text-white font-bold'>
                    {categoriesData?.length}
                  </div>
                </div>
                <div>
                  <Table
                    bordered
                    dataSource={orderProducts}
                    columns={columns}
                    pagination={false}
                    expandable={{
                      expandedRowRender: TableChildrend
                    }}
                  />
                </div>
              </div>
              <div className='w-1/2 border border-boxdark rounded-md'>
                <div className='flex justify-between items-center bg-[#5800FF] py-1'>
                  <h4 className='text-xl font-bold text-white pl-2'>Categories Question</h4>
                  <div className='w-[40px] h-[40px] rounded-md shadow-xl bg-[#bcb0d2] mr-2 flex justify-center items-center text-white font-bold'>
                    0
                  </div>
                </div>
                <div className='mt-5 mx-2'>
                  <div className='w-full  border rounded-md  shadow-lg bg-white bg-opacity-25'>
                    {dataCategoriess?.map((category: any) => {
                      return (
                        <CategoryTreeItem
                          key={category?._id}
                          category={category}
                          level={0}
                          bg={true}
                          button={true}
                          createExams={true}
                          checkMember={true}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className=' mx-auto flex mt-15 justify-center items-center w-full'>
        <Button onClick={handelInsertExams} styleClass='py-2 w-2/3 bg-[#24A19C]'>
          Thêm Đề Thi
        </Button>
      </div>
    </>
  )
}

export default CreateExams
