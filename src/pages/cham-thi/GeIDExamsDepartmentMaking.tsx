import { Button, Divider, Drawer, Image, Input, Result, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetExamsTlQuery } from '~/apis/topicQuestion/topicQuestion'

const GeIDExamsDepartmentMaking = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
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
  console.log(dataDetailsExamUser)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
    setDataDetail([])
  }
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
  if (isFetching || isLoading)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  if (dataDetailsExamUser?.length == 0)
    return (
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
    )
  console.log(dataDetail)
  return (
    <div>
      <Drawer title='Chi tiết' placement='top' onClose={onClose} open={open} size='large' destroyOnClose>
        <div>
          <p className='mb-7 text-black font-medium'>Điểm chuẩn</p>
          <Input className='!text-black text-md font-medium' value={dataDetail?.point} disabled />
          <p className='mb-7 mt-4 text-black text-md font-medium'>Đáp án đúng</p>
          <Input.TextArea value={dataDetail?.trueAnswer} disabled />

          <p className='mb-7 mt-4 text-black font-medium'>Số điểm bạn chấm</p>
          <Input className='!text-black text-md font-medium border border-[#ccc]' />
          <p className='mb-7 mt-4 text-black text-md font-medium'>Lý do</p>
          <Input.TextArea />

          <div className='flex justify-end'>
            <Button className='bg-success text-white w-[200px] mt-5'>Xác nhận</Button>
          </div>
        </div>
      </Drawer>
      <div>
        <Button className='w-[200px]' onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
      <div className='mb-5'>
        <Divider orientation='left'>Chấm thi </Divider>
      </div>
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
  )
}
export default GeIDExamsDepartmentMaking
