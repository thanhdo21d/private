import { Badge, Descriptions, Divider, Drawer, Image, Popconfirm, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '~/components'
import pdfExport from '../../../assets/images/logo/pdf-svgrepo-com.svg'
import { useGetDetailListExamQuery } from '~/apis/topicQuestion/topicQuestion'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { showDetails } from '~/store/slice/detailsResultExam'
const DetailsResult = () => {
  const uri = import.meta.env.VITE_API
  const { status, indexResult } = useAppSelector((state) => state.showDetailsExam)
  console.log(indexResult, 'cclt')
  const navigate = useNavigate()
  const { id } = useParams()
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const {
    data: dataDetailsExamUser,
    isFetching,
    isLoading
  } = useGetDetailListExamQuery({
    id: id as string
  })
  const onClose = () => {
    setOpen(false)
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const checkResultNull = dataDetailsExamUser?.questionCheck.filter(
    (checkResult: any) => checkResult.userChoose == undefined
  )
  let userChoose = ''
  function displayArrayElements(array: string[]) {
    if (array == undefined) {
      userChoose = 'chưa chọn'
      return
    }
    if (array.length === 1) {
      userChoose = array[0]
    } else if (array.length > 1) {
      const result = array.join(' ')
      userChoose = result
    } else {
      console.log('Mảng trống.')
    }
  }
  const items = [
    {
      key: '1',
      label: <p className='text-black font-medium '>Số Câu Đúng</p>,
      children: <p>{dataDetailsExamUser?.correct_answer} Câu</p>,
      span: 4
    },
    {
      key: '2',
      label: <p className='text-black font-medium '>Số Câu Sai</p>,
      children: <p>{dataDetailsExamUser?.fail_answer} Câu</p>,
      span: 4
    },
    {
      key: '3',
      label: <p className='text-black font-medium '>Số Câu Chưa làm</p>,
      children: <p>{checkResultNull?.length} Câu</p>,
      span: 4
    },
    {
      key: '4',
      label: <p className='text-black font-medium '>Điểm Số</p>,
      children: <p>{dataDetailsExamUser?.score} Điểm</p>,
      span: 4
    },
    {
      key: '4',
      label: <p className='text-black font-medium '>Ngày Thi</p>,
      children: <p>{dataDetailsExamUser?.createdAt.split('T')[0]} </p>
    }
  ]
  const dataSource = dataDetailsExamUser?.questionCheck.map((items: any, index: number) => ({
    key: index,
    name: items.questionName,
    image: items.imageQuestion[0],
    userChoose: items.userChoose,
    trueAnswer: items.trueAnswer,
    questionCheck: items
  }))
  console.log(dataDetailsExamUser?.questionCheck[indexResult.indexResult], 'pl')
  const dataSourceChoose = dataDetailsExamUser?.questionCheck[indexResult.indexResult]?.choose.map(
    (items: any, index: number) => ({
      key: index,
      img: items.img,
      q: items.q
    })
  )
  const checkTrueFalse = dataDetailsExamUser?.questionCheck[indexResult.indexResult]
  console.log(checkTrueFalse)
  const columnsChoose = [
    {
      title: 'câu hỏi',
      dataIndex: 'q',
      key: 'q'
    },
    {
      title: 'ảnh',
      dataIndex: 'img',
      key: 'img',
      width: 200,
      render: (items: any) => {
        return <div>{items !== '' ? <Image className='w-[200px]' src={`${uri}${items}`} /> : ''}</div>
      }
    }
  ]
  const columns = [
    {
      title: 'Câu Hỏi',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        const maxLength = 70
        if (text.length <= maxLength) {
          return <p className=''>{text}</p>
        }
        const chunks = []
        for (let i = 0; i < text.length; i += maxLength) {
          chunks.push(text.slice(i, i + maxLength))
        }
        return (
          <p className='' style={{ whiteSpace: 'pre-line' }}>
            {chunks.map((chunk, index) => (
              <React.Fragment key={index}>
                {index > 0 && <br />}
                {chunk}
              </React.Fragment>
            ))}
          </p>
        )
      }
    },
    {
      title: 'ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => {
        console.log(text?.length)
        return <div>{text && <Image className='!w-[75px]' src={`${uri}${text}`} />}</div>
      }
    },
    {
      title: <p className='flex justify-center'>bạn chọn</p>,
      dataIndex: 'userChoose',
      key: 'userChoose',
      render: (items: any) => {
        displayArrayElements(items)
        return (
          <p className={`flex justify-center ${items == undefined ? 'text-danger font-bold text-md' : ''}`}>
            {items == undefined ? 'chưa chọn' : userChoose}
          </p>
        )
      }
    },
    {
      title: <p className='flex justify-center'>Đáp án đúng</p>,
      dataIndex: 'trueAnswer',
      key: 'trueAnswer',
      render: (text: string) => {
        return <p className='flex justify-center font-bold text-success'>{text}</p>
      }
    },
    {
      title: <p className='flex justify-center'>Tác vụ</p>,
      render: ({ key }: { key: string }) => {
        return (
          <p
            onClick={() => {
              showDrawer()
              return dispatch(
                showDetails({
                  status: true,
                  indexResult: key
                })
              )
            }}
            className='flex justify-center font-bold text-danger underline cursor-pointer'
          >
            Chi tiết
          </p>
        )
      }
    }
  ]
  if (isFetching || isLoading) return <p>loading......</p>
  return (
    <div>
      <Drawer
        title='chi tiết câu hỏi'
        placement={'right'}
        width={900}
        onClose={onClose}
        open={open}
        extra={<Button onClick={onClose}>Cancel</Button>}
      >
        <div className='w-full'>
          <div className='w-full'>
            <h3 className='text-black text-md font-medium'>Bình Luận từ Admin</h3>
            <textarea
              className='border mt-5 mb-5 border-[#ccc] w-full pl-5 pt-1'
              value={dataDetailsExamUser?.questionCheck[indexResult.indexResult]?.commentAdmin || ''}
            ></textarea>
          </div>
          <Table bordered dataSource={dataSourceChoose} columns={columnsChoose} pagination={false} />
        </div>
      </Drawer>
      <div className='flex gap-3 justify-end'>
        <Button onClick={() => navigate(-1)} styleClass='bg-success'>
          Quay Lại
        </Button>
      </div>
      <div className='mt-5 border-t border-[#ccc]'>
        <div className='mt-2'>
          <Descriptions title={`Chi Tiết Bài Thi ${dataDetailsExamUser?.nameExams}`} bordered items={items} />
        </div>
      </div>
      <div className='my-15'>
        <Divider orientation='left'>Nội Dung Bài Thi</Divider>
      </div>
      <div>
        <div>
          <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </div>
    </div>
  )
}
export default DetailsResult
