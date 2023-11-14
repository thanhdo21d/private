import { Popconfirm, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { Button } from '~/components'
import { CategoryTreeItem } from './Silbader'

const EditTree = () => {
  const { id } = useParams()
  useEffect(() => {
    const fetchDataTree = async () => {
      const { data } = await axios.get(`http://localhost:8282/category-tree/${id}`)
      logChildrenNames(data)
    }
    fetchDataTree()
  }, [id])
  const logChildrenNames = (node) => {
    console.log(node.name)
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        logChildrenNames(child)
      })
    }
  }
  const data = []
  const dataSource = data?.banners?.map((item: any, index: any) => ({
    stt: index,
    key: item._id,
    name: item.url
  }))
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: string) => {
        return <p className='text-md font-bold '>{text}</p>
      }
    },
    {
      title: 'tên categories',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: string) => {
        const checkColor = text == '0' ? 'text-danger' : 'text-success'
        return <p className={`${checkColor} font-bold text-md`}>{text == '0' ? 'Banner Login ' : 'Banner Home'}</p>
      }
    },
    {
      title: 'Tác Vụ',
      render: ({ key: id }: { key: string }) => (
        <div className='flex space-x-2'>
          <Popconfirm
            title='Delete the task'
            description='Are you sure to delete this task?'
            onConfirm={() => confirm(id)}
            okText='Yes'
            okButtonProps={{
              style: { backgroundColor: 'blue' }
            }}
            cancelText='No'
            placement='rightBottom'
          >
            {/* <Button styleClass='bg-danger '>Xóa</Button> */}
          </Popconfirm>
          <Button styleClass='flex items-center '>
            <span>
              <AiFillEdit />
            </span>
            <span>edit</span>
          </Button>
        </div>
      )
    }
  ]
  return <div>{<Table dataSource={dataSource} pagination={false} columns={columns} />}</div>
}

export default EditTree
