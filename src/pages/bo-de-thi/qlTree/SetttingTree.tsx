import { Breadcrumb, Col, Drawer, Form, Input, Row, Select, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '~/components'
import fadeIn from '~/utils/animation/variant'
import { useCreateCategoriesMutation } from '~/apis/category/categories'
import axios from 'axios'
import { CategoryTreeItem } from './Silbader'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
const SetttingTree = () => {
  const [queryParameters] = useSearchParams()
  const dataExamsQuery: any = queryParameters.get('category')
  const { id } = useParams()
  const uri = import.meta.env.VITE_API
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [createCategories, { isLoading: isCreateCategoriesLoading }] = useCreateCategoriesMutation()
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    axios
      .get(`${uri}category-tree/${id}`)
      .then((response: any) => {
        setCategories([response.data])
      })
      .catch((error) => {
        console.error('Error fetching categories', error)
      })
  }, [id, uri])
  const onFinish = ({ name }: { name: string }) => {
    createCategories({
      name: name,
      parentId: dataExamsQuery
    })
      .unwrap()
      .then(() => {
        toastService.success('Successfully created categories')
        sessionStorage.removeItem('categories')
        setOpen(false)
        setTimeout(() => {
          window.location.reload()
        }, 400)
      })
  }
  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Trang Quản Trị'
          },
          {
            title: 'Cài Đặt'
          }
        ]}
      />
      <Drawer
        title='Cấu Hình Categories'
        width={720}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form onFinish={onFinish} layout='vertical' hideRequiredMark>
          <div>
            <Form.Item
              name='name'
              label={<p className='font-bold text-xl'>Tên categories</p>}
              rules={[{ required: true, message: 'vui lòng nhập Tên categories ...!' }]}
            >
              <Input className=' border border-[#ccc]' placeholder='vui lòng nhập Tên categories ...!' />
            </Form.Item>
          </div>
          {categories.map((category: any) => (
            <CategoryTreeItem key={category._id} category={category} level={0} bg={true} button={false} />
          ))}
          <button
            type='submit'
            className=' mt-5  w-full btn flex justify-center bg-blue-500 text-gray-100 p-2 text-2xl text-white  rounded-full tracking-wide bg-secondary  font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg  transition ease-in duration-300'
          >
            Submit
          </button>
        </Form>
      </Drawer>
      <div>
        <motion.div
          variants={fadeIn('right', 0.25)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.7 }}
          className='w-full h-[60px] mt-10 flex justify-between cursor-pointer  items-center dark:bg-black rounded-md bg-white'
        >
          <p className='text-left items-center pl-5'>Cấu Hình Categoies</p>
          <div className='flex items-center mr-10'>
            <Link to={`/tree-menu/${id}/settings/edit`} className='text-left items-center pl-5 '>
              xóa / sửa
            </Link>
            <p className='text-left items-center pl-5 hover:scale-125' onClick={showDrawer}>
              thêm
            </p>
          </div>
        </motion.div>
        <motion.div
          onClick={() => navigate('ki-thi')}
          variants={fadeIn('right', 0.35)}
          initial='hidden'
          whileInView={'show'}
          viewport={{ once: false, amount: 0.8 }}
          className='w-full mt-5 h-[60px] cursor-pointer flex items-center dark:bg-black rounded-md bg-white'
        >
          <p className='text-left items-center pl-5'> Kì Thi</p>
        </motion.div>
      </div>
    </>
  )
}
export default SetttingTree
