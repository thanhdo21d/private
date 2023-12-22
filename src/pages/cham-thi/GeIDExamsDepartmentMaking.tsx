import { Button, Divider, Drawer, Image, Input, Result, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useDoneExamsTlMutation,
  useGetExamsTlQuery,
  useUpdateCommentAdminExamsUserMutation
} from '~/apis/topicQuestion/topicQuestion'
import { toastService } from '~/utils/toask/toaskMessage'

const GeIDExamsDepartmentMaking = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [dataPoint, setDataPoint] = useState({
    point: '',
    commentAdmin: ''
  })
  const [updateCommentAdmin] = useUpdateCommentAdminExamsUserMutation()
  const [dataDetail, setDataDetail] = useState<any[]>([])
  const uri = import.meta.env.VITE_API
  const { id } = useParams()
  const {
    data: dataDetailsExamUser,
    isFetching,
    isLoading
  } = useGetExamsTlQuery({
    id: id as string
  })
  const [doneExam] = useDoneExamsTlMutation()
  console.log(dataDetailsExamUser)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
    setDataDetail([])
    setDataPoint({
      point: '',
      commentAdmin: ''
    })
  }
  console.log(id)
  const dataSource = dataDetailsExamUser?.map((items: any, index: number) => ({
    key: index,
    choose: index + 1,
    name: items.questionName,
    imageQuestion: items.imageQuestion[0]
  }))

  const columns = [
    {
      title: 'STT',
      dataIndex: 'choose',
      key: 'choose',
      render: (name: string) => {
        return <p className='flex justify-center'>{name}</p>
      }
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'name',
      key: 'name',
      width: 520,
      render: (name: string) => {
        return <p className=''>{name}</p>
      }
    },
    {
      title: 'Ảnh câu hỏi',
      dataIndex: 'imageQuestion',
      key: 'imageQuestion',
      render: (image: string) => {
        console.log(image)
        return <div>{image && <Image className='!w-[120px]' src={`${uri}${image}`} />}</div>
      }
    },
    {
      title: <p className='flex justify-center'> Tác vụ</p>,
      render: ({ key }: { key: number }) => {
        console.log(key)

        return (
          <div className='flex justify-center'>
            <Button
              onClick={() => {
                setDataDetail(dataDetailsExamUser[key])
                showDrawer()
              }}
              className='bg-primary text-white '
            >
              Chi tiết
            </Button>
          </div>
        )
      }
    }
  ]
  const handelUpdateCommentAdmin = () => {
    updateCommentAdmin({
      id: id as string,
      dataComment: dataPoint.commentAdmin,
      index: dataDetail.questionIndex,
      point: dataPoint.point
    })
      .unwrap()
      .then(() => {
        toastService.success(' updated successfully')
        onClose()
      })
      .catch(() => toastService.error(' errror update'))
  }
  const handelDoneExams = () => {
    doneExam({
      id: id as string
    })
      .unwrap()
      .then(() => {
        toastService.success(' updated successfully')
        navigate(-1)
      })
      .catch(() => toastService.error(' errror update'))
  }
  if (isFetching || isLoading)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  console.log(dataDetail)
  return (
    <div>
      <Drawer title='Chi tiết' placement='top' onClose={onClose} open={open} size='large' destroyOnClose>
        <div>
          <p className='mb-7 text-black font-medium'>Đáp án nhân viên chọn</p>
          <Input.TextArea className='!text-black text-md font-medium' value={dataDetail?.userChoose} disabled />
          <p className='mb-7 text-black font-medium'>Điểm chuẩn</p>
          <Input className='!text-black text-md font-medium' value={dataDetail?.point} disabled />
          <p className='mb-7 mt-4 text-black text-md font-medium'>Đáp án đúng</p>
          <Input.TextArea value={dataDetail?.trueAnswer} disabled />
          <p className='mb-7 mt-4 text-black font-medium'>Số điểm bạn chấm</p>
          <Input
            onChange={(event: any) =>
              setDataPoint({
                ...dataPoint,
                point: event.target.value
              })
            }
            placeholder='point'
            className='!text-black text-md font-medium border border-[#ccc]'
          />
          <p className='mb-7 mt-4 text-black text-md font-medium'>Lý do</p>
          <Input.TextArea
            placeholder='comment Admin'
            onChange={(event: any) =>
              setDataPoint({
                ...dataPoint,
                commentAdmin: event.target.value
              })
            }
          />

          <div className='flex justify-end'>
            <Button onClick={handelUpdateCommentAdmin} className='bg-success text-white w-[200px] mt-5'>
              Xác nhận
            </Button>
          </div>
        </div>
      </Drawer>
      <div className='flex justify-between items-center'>
        <Button className='w-[200px]' onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
      <div className='mb-5'>
        <Divider orientation='left'>Chấm thi </Divider>
      </div>
      <div className='flex justify-end'>
        <Button onClick={handelDoneExams} className='w-[200px] bg-primary text-white font-medium text-md'>
          Hoàn thành
        </Button>
      </div>
      {dataDetailsExamUser?.length == 0 ? (
        <div>
          <div>
            <Result
              status='500'
              title='204'
              subTitle='Không có câu nào cần chấm.'
              extra={
                <Button onClick={() => navigate(-1)} className='bg-primary text-white'>
                  Quay lại
                </Button>
              }
            />
          </div>
        </div>
      ) : (
        <div>
          <div className='mt-8'>
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered />
          </div>
          <div>
            <Footer className='mt-5  flex justify-between dark:bg-black '>
              <div className='text-md font-semibold text-center dark:text-white'>
                Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
                design by thanhdo
              </div>
            </Footer>
          </div>
        </div>
      )}
    </div>
  )
}
export default GeIDExamsDepartmentMaking
