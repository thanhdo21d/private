import { Popconfirm } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { Button } from '~/components'

const EditTree = () => {
  // const dataSource = data?.banners.map((item: any, index: any) => ({
  //   stt: index,
  //   key: item._id,
  //   name: item.url
  // }))
  // const columns = [
  //   {
  //     title: 'STT',
  //     dataIndex: 'stt',
  //     key: 'stt',
  //     render: (text: string) => {
  //       return <p className='text-md font-bold '>{text}</p>
  //     }
  //   },
  //   {
  //     title: 'tên banner',
  //     dataIndex: 'stt',
  //     key: 'stt',
  //     render: (text: string) => {
  //       const checkColor = text == '0' ? 'text-danger' : 'text-success'
  //       return <p className={`${checkColor} font-bold text-md`}>{text == '0' ? 'Banner Login ' : 'Banner Home'}</p>
  //     }
  //   },
  //   {
  //     title: 'images',
  //     dataIndex: 'name',
  //     key: 'name',
  //     render: (text: string) => {
  //       return <img className='w-[200px] h-[100px]' src={`${text}`} />
  //     }
  //   },
  //   {
  //     title: 'Tác Vụ',
  //     render: ({ key: id }: { key: string }) => (
  //       <div className='flex space-x-2'>
  //         <Popconfirm
  //           title='Delete the task'
  //           description='Are you sure to delete this task?'
  //           onConfirm={() => confirm(id)}
  //           okText='Yes'
  //           okButtonProps={{
  //             style: { backgroundColor: 'blue' }
  //           }}
  //           cancelText='No'
  //           placement='rightBottom'
  //         >
  //           {/* <Button styleClass='bg-danger '>Xóa</Button> */}
  //         </Popconfirm>
  //         <Button styleClass='flex items-center '>
  //           <span>
  //             <AiFillEdit />
  //           </span>
  //           <span>{t('product.edit_banner')}</span>
  //         </Button>
  //       </div>
  //     )
  //   }
  // ]
  return <div>{/* <Table dataSource={dataSource} pagination={false} columns={columns} /> */}</div>
}

export default EditTree
