import React, { useState } from 'react'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import checkIcons from '../../../assets/check.png'
import unCheckIcons from '../../../assets/unchecked.png'
import dayjs from 'dayjs'
import { Button } from '~/components'
import { DatePicker, Divider, Drawer, Empty, Image, Input, InputNumber, Skeleton, Space, Table, Tag } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTopicExamsIDQuery } from '~/apis/examSetting/examSetting'
interface DataType {
  key: React.Key
  point: string
  results: string
  age: number
  address: string
  question: string[]
}
const DetailsExamsQuestion = () => {
  const { Column, ColumnGroup } = Table
  const { id } = useParams()
  const uri = import.meta.env.VITE_API
  console.log(id)
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
  }
  const navigate = useNavigate()
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useGetTopicExamsIDQuery(id as string)
  console.log(dataIdExmasDetails?.data?.question)
  const dateFormat = 'YYYY/MM/DD'
  const data: DataType[] = dataIdExmasDetails?.data?.question.map((items: any) => {
    console.log(items)
    return {
      key: items.question._id,
      question: items.question.question,
      image: items.question.image,
      point: items.question.point,
      results: items.question.answer,
      questionA: items.question.choose
    }
  })
  return (
    <div className='w-full'>
      <>
        <div className=' mt-15 justify-center items-center w-1/6'>
          <Button onClick={() => navigate(-1)} styleClass='py-2 w-2/3 bg-[#24A19C]'>
            Quay Lại
          </Button>
        </div>
        <Divider orientation='left'>Chi Tiết Đề Thi</Divider>
        {isLoadingDetails || isFetchingDetails ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div>
            <div className='flex gap-10'>
              <div>
                <p>Kì Thi</p>
                <Input
                  className='h-[32px] border mt-2 border-[#d9d9d9] text-black font-bold  w-[400px] rounded-md'
                  size='large'
                  placeholder='large size'
                  disabled={true}
                  value={dataIdExmasDetails?.data?.name}
                />
              </div>
              <div>
                <p> Hiệu lực trong</p>
                <DatePicker.RangePicker
                  className='mt-2'
                  onChange={onDateChange}
                  defaultValue={[
                    dayjs(dataIdExmasDetails?.data?.startDate?.split('T')[0], dateFormat),
                    dayjs(dataIdExmasDetails?.data?.endDate?.split('T')[0], dateFormat)
                  ]}
                />
              </div>
              <div>
                <p>Thời Gian </p>
                <InputNumber
                  className='!h-[32px] mt-2 rounded-md'
                  size='large'
                  value={dataIdExmasDetails?.data?.time}
                />
              </div>
            </div>

            <div className='mt-10'>
              <p>Tên Bài Thi</p>
              <Input
                className='h-[32px] border mt-2 border-[#d9d9d9]  w-full rounded-md'
                size='large'
                placeholder='large size'
                disabled={true}
                value={dataIdExmasDetails?.data?.name}
              />
            </div>
            <div className='border-b border-[#d9d9d9] mb-5'>
              <Divider orientation='left' plain>
                <p> Câu Hỏi</p>
              </Divider>
              <div className='flex w-full justify-center'>
                <Table className='w-full ' dataSource={data} pagination={false}>
                  <ColumnGroup className='' title={<p className='border-b border-[#ccc]'>questions</p>}>
                    <Column
                      title='Câu Hỏi'
                      dataIndex='question'
                      key='question'
                      render={(data: string) => <p>{data.length > 20 ? `${data.slice(0, 20)}...` : data}</p>}
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
                            return <Image key={tag} width={70} src={`${uri}/${tag}`}></Image>
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
                        render={(questionA: any) => (
                          <p>{questionA[0].q.length > 20 ? `${questionA[0].q.slice(0, 20)}...` : questionA[0].q}</p>
                        )}
                      />
                      <Column
                        title='Ảnh'
                        dataIndex='questionA'
                        className='border-r border-[#ccc]'
                        key='questionA'
                        render={(questionA: any) => {
                          return (
                            <>{questionA[0].img && <Image width={50} src={`${uri}/${questionA[0]?.img}`}></Image>}</>
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
                          <p>{questionA[1].q.length > 20 ? `${questionA[1].q.slice(0, 20)}...` : questionA[1].q}</p>
                        )}
                      />
                      <Column
                        title='Ảnh'
                        dataIndex='questionA'
                        key='questionA'
                        className='border-r border-[#ccc]'
                        render={(questionA: any) => {
                          return (
                            <>{questionA[1].img && <Image width={50} src={`${uri}/${questionA[1]?.img}`}></Image>}</>
                          )
                        }}
                      />
                    </ColumnGroup>
                    <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án C</p>}>
                      <Column
                        title={<p className='flex justify-center'>C</p>}
                        dataIndex='questionA'
                        key='questionA'
                        render={(questionA: any) => (
                          <p>{questionA[2].q.length > 20 ? `${questionA[2].q.slice(0, 20)}...` : questionA[2].q}</p>
                        )}
                      />
                      <Column
                        title='Ảnh'
                        className='border-r border-[#ccc]'
                        dataIndex='questionA'
                        key='questionA'
                        render={(questionA: any) => {
                          return (
                            <>{questionA[2].img && <Image width={50} src={`${uri}/${questionA[2]?.img}`}></Image>}</>
                          )
                        }}
                      />
                    </ColumnGroup>
                    <ColumnGroup title={<p className='border-b border-[#ccc]'>Đáp Án D</p>}>
                      <Column
                        title={<p className='flex justify-center'>D</p>}
                        dataIndex='questionA'
                        key='questionA'
                        render={(questionA: any) => (
                          <p>{questionA[3]?.q?.length > 20 ? `${questionA[3]?.q?.slice(0, 20)}...` : questionA[3].q}</p>
                        )}
                      />
                      <Column
                        title='Ảnh'
                        dataIndex='questionA'
                        className='border-r border-[#ccc]'
                        key='questionA'
                        render={(questionA: any) => {
                          return (
                            <>{questionA[3].img && <Image width={50} src={`${uri}/${questionA[3]?.img}`}></Image>}</>
                          )
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
                    className=''
                    title={<p className='flex justify-center'>Action</p>}
                    key='action'
                    render={({ key: id }: { key: string }) => {
                      return (
                        <Space size='middle'>
                          <a
                            onClick={() =>
                              navigate({
                                pathname: `/tree-menu/${id}/details-exams/${id}`
                              })
                            }
                            className='text-success font-medium underline '
                          >
                            Details
                          </a>
                          <a className='text-success font-medium underline'>edit</a>
                          <a className='text-danger font-medium underline'>Delete</a>
                        </Space>
                      )
                    }}
                  />
                </Table>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default DetailsExamsQuestion
