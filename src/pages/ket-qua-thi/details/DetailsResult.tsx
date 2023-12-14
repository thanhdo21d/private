import { Badge, Descriptions, Divider, Image, Popconfirm, Table, Tooltip } from 'antd'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '~/components'
import pdfExport from '../../../assets/images/logo/pdf-svgrepo-com.svg'
import { useGetDetailListExamQuery } from '~/apis/topicQuestion/topicQuestion'
import ChilDetailsTable from './ChilDetailsTable'
const DetailsResult = () => {
  const uri = import.meta.env.VITE_API
  const navigate = useNavigate()
  const { id } = useParams()
  const {
    data: dataDetailsExamUser,
    isFetching,
    isLoading
  } = useGetDetailListExamQuery({
    id: id as string
  })
  console.log(dataDetailsExamUser)
  const checkResultNull = dataDetailsExamUser?.questionCheck.filter(
    (checkResult: any) => checkResult.userChoose == undefined
  )
  console.log(checkResultNull)
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
    }
  ]
  if (isFetching || isLoading) return <p>loading......</p>
  return (
    <div>
      <div className='flex gap-3 justify-end'>
        <div className=' items-center text-center hover:bg-primary bg-bodydark2 rounded-lg h-[62px]'>
          <Tooltip placement='top' title={'Export to Pdf !'}>
            <img className='w-[50px] pt-1' src={pdfExport} />
          </Tooltip>
        </div>
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
          <Table
            bordered
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            expandable={{
              expandedRowRender: ChilDetailsTable
            }}
          />
        </div>
      </div>
    </div>
  )
}
export default DetailsResult
