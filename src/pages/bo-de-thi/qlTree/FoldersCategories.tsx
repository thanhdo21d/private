import { Breadcrumb, Divider, Drawer, Form, Input, Popconfirm, Skeleton, Space, Table, message } from 'antd'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import { CategoryTreeItem } from './Silbader'
import { useCreateCategoriesMutation, useGetCategoriesDepartmentsQuery } from '~/apis/category/categories'
import { MdOutlineDriveFolderUpload } from 'react-icons/md'
import { Footer } from 'antd/es/layout/layout'
import { toastService } from '~/utils/toask/toaskMessage'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
const FoldersCategories = () => {
  const idCate = localStorage.getItem('idCategories')
  const { id } = useParams()
  const [queryParameters] = useSearchParams()
  const dataExamsQuery: any = queryParameters.get('category')
  const searchKeyword: string | null = queryParameters.get('keyword')
  const [dataCategories, setDataCategories] = useState<any[]>([])
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const queryConfig = useQueryConfig()
  const {
    data: dataCategoriTree,
    isLoading,
    isFetching
  } = useGetCategoriesDepartmentsQuery({
    id: idCate as string,
    name: searchKeyword || ''
  })
  const [createCategories, { isLoading: isCreateCategoriesLoading }] = useCreateCategoriesMutation()
  useEffect(() => {
    const savedCategories = sessionStorage.getItem('categories')
    console.log(savedCategories, 'sess')
    if (savedCategories) {
      setDataCategories(JSON.parse(savedCategories))
      console.log(dataCategories)
    } else {
      if (dataCategoriTree) {
        // Kiểm tra nếu dataCategoriTree không phải null hoặc undefined
        setDataCategories([dataCategoriTree])
        sessionStorage.setItem('categories', JSON.stringify([dataCategoriTree]))
      }
    }
  }, [idCate, dataCategoriTree]) // Thêm dataCategoriTree vào dependency array

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
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
      })
  }

  const onFinishSearch = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    console.log(keywordSpace)
    navigate({
      search: createSearchParams({
        ...queryConfig,
        keyword: keywordSpace
      }).toString()
    })
  }
  return (
    <div className='relative'>
      {isLoading || isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className='min-h-screen '>
          <Drawer
            title='Cấu Hình Folders'
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
                  label={<p className='font-bold text-xl'>Tên Folders</p>}
                  rules={[{ required: true, message: 'vui lòng nhập Tên Folders ...!' }]}
                >
                  <Input className=' border border-[#ccc]' placeholder='vui lòng nhập Tên Folders ...!' />
                </Form.Item>
              </div>
              <div>
                {dataCategories?.map((category: any) => {
                  if (category && category._id) {
                    return (
                      <CategoryTreeItem
                        key={category._id}
                        category={category}
                        level={0}
                        bg={true}
                        button={true}
                        createExams={false}
                        checkMember={false}
                      />
                    )
                  }
                  return null
                })}
              </div>

              <Button type='submit' styleClass=' w-full mt-3'>
                {isCreateCategoriesLoading ? <div>....Loading</div> : 'Submit'}
              </Button>
            </Form>
          </Drawer>
          <Breadcrumb
            items={[
              {
                title: 'DashBoard'
              },
              {
                title: 'Cấu Hình Thư Mục'
              }
            ]}
          />
          <div className='flex justify-between mb-5 mt-3'>
            <div>
              <Form onFinish={onFinishSearch} className='flex gap-5' layout='vertical' hideRequiredMark>
                <Form.Item name='keyword' rules={[{ required: true, message: 'vui lòng nhập Tên Folder ...!' }]}>
                  <Input className='w-[330px] border border-[#ccc]' placeholder='vui lòng nhập Tên Folder ...!' />
                </Form.Item>
                <Form.Item>
                  <button className='bg-success px-8 rounded-md text-white font-medium py-2.5' type='submit'>
                    Submit
                  </button>
                </Form.Item>
              </Form>
            </div>
            <div className='flex items-center gap-5'>
              <button
                className='bg-success px-8 rounded-md text-white font-medium py-2.5 flex items-center gap-3'
                onClick={showDrawer}
              >
                <span>
                  <MdOutlineDriveFolderUpload />
                </span>
                <span>Tạo Folder Mới </span>
              </button>
            </div>
          </div>
          <div className='mt-5 overflow-y-auto border rounded-md  shadow-lg'>
            {dataCategories?.map((category: any) => {
              return (
                <CategoryTreeItem
                  key={category?._id}
                  category={category}
                  level={0}
                  bg={true}
                  button={true}
                  createExams={false}
                />
              )
            })}
          </div>
          <Footer className='mt-5 w-full  justify-between dark:bg-black '>
            <div className='text-md font-semibold text-center dark:text-white'>
              Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
              <br />
              Design by thanhdo
            </div>
          </Footer>
        </div>
      )}
    </div>
  )
}

export default FoldersCategories
