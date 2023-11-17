import { Divider, Popconfirm, Skeleton, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { Button } from '~/components'
import { CategoryTreeItem } from './Silbader'
const EditTree = () => {
  const uri = import.meta.env.VITE_API
  const { id } = useParams()
  const [dataCategories, setDataCategories] = useState<any[]>([])
  useEffect(() => {
    axios
      .get(`${uri}category-tree/${id}`)
      .then((response: any) => {
        setDataCategories([response.data])
      })
      .catch((error) => {
        console.error('Error fetching categories', error)
      })
  }, [id, uri])

  return (
    <div className='min-h-screen '>
      <Divider orientation='left'>Cấu Hình Categories</Divider>
      <div className='mt-15 min-h-screen'>
        {dataCategories?.map((category: any) => {
          console.log(category)
          return <CategoryTreeItem key={category._id} category={category} level={0} bg={true} button={true} />
        })}
      </div>
    </div>
  )
}
export default EditTree
