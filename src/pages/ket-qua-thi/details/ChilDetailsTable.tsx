import { Table, Tooltip } from 'antd'
import React from 'react'
import details from '../../../assets/details.png'
const ChilDetailsTable = (questionCheck: any) => {
  console.log(questionCheck)
  const columns = [
    {
      title: <p className=''>comment Admin</p>,
      dataIndex: 'commentAdmin',
      key: 'commentAdmin',
      render: (commentAdmin: any) => {
        console.log(commentAdmin)
        return <div>{commentAdmin !== null && <p>{commentAdmin}</p>}</div>
      }
    },
    {
      title: <p className='!flex !justify-center items-center'>count</p>,
      dataIndex: 'count',
      key: 'count',
      render: (count: any, record: any, index: number) => (
        <div className='flex justify-center items-center gap-3'>
          <>ok</>
        </div>
      )
    },
    {
      title: <p className='flex mx-auto justify-center'>Hành Động</p>,
      render: ({ key: id }: { key: number | string }) => (
        <div className='flex mx-auto justify-center'>
          <Tooltip title='chi tiết'>
            <img className='w-[32px] cursor-pointer hover:scale-110 ease-linear' src={details} />
          </Tooltip>
        </div>
      )
    }
  ]
  const dataPush = Array(questionCheck)?.map((item: any, index: number) => {
    console.log(item)
    return {
      key: index,
      img: item.img,
      commentAdmin: item.questionCheck.commentAdmin,
      trueAnswer: item.trueAnswer,
      userChoose: item.userChoose
    }
  })
  return <Table className='my-3' bordered columns={columns} dataSource={dataPush} pagination={false} />
}

export default ChilDetailsTable
