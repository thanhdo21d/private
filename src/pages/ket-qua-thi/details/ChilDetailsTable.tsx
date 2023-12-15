import { Drawer, Space, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import details from '../../../assets/details.png'
import { Button } from '~/components'
const ChilDetailsTable = (questionCheck: any) => {
  console.log(questionCheck)
  const columns = [
    {
      title: <p className=''>Bình Luận từ Admin</p>,
      dataIndex: 'commentAdmin',
      key: 'commentAdmin',
      render: (commentAdmin: any) => {
        console.log(commentAdmin)
        return <div>{commentAdmin !== null && <p>{commentAdmin}</p>}</div>
      }
    },
    {
      title: <p className='!flex !justify-center items-center'>Lựa Chọn</p>,
      dataIndex: 'demo',
      key: 'demo',
      render: (count: any, index: any) => {
        console.log(index)
        const checkTrueFalse = index.trueAnswer.includes(index.userChoose)
        return (
          <div className='flex justify-center items-center gap-3'>
            <p className={`${checkTrueFalse ? 'text-success font-medium text-md' : 'text-danger font-medium text-md'}`}>
              {index.userChoose && <span>{checkTrueFalse ? 'Đúng' : 'Sai'}</span>}
              {!index.userChoose && 'Chưa chọn'}
            </p>
          </div>
        )
      }
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
      userChoose: item.userChoose,
      demo: item.questionCheck[index]
    }
  })
  // const onClose = () => {
  //   setOpen(false)
  // }
  // const showDrawer = () => {
  //   setOpen(true)
  // }
  // onClick={showDrawer}
  return <Table className='my-3' bordered columns={columns} dataSource={dataPush} pagination={false} />
  //  (
  //   // <div>
  //     {/* <Drawer
  //       title='Drawer with extra actions'
  //       placement={'right'}
  //       width={500}
  //       onClose={onClose}
  //       open={open}
  //       extra={
  //         <Space>
  //           <Button onClick={onClose}>Cancel</Button>
  //           <Button onClick={onClose}>OK</Button>
  //         </Space>
  //       }
  //     >
  //       <p>Some contents...</p>
  //       <p>Some contents...</p>
  //       <p>Some contents...</p>
  //     </Drawer> */}
  //   {/* </div> */}
  // )
}

export default ChilDetailsTable
