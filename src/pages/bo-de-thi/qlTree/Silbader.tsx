/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon, Button } from '~/components'
import { Drawer, Form, Input, Menu, Popconfirm, Select, Skeleton, Table, Tooltip } from 'antd'
import { NavLink, createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AiFillHome, AiFillSetting, AiOutlineDashboard } from 'react-icons/ai'
import { FaRegFolderOpen } from 'react-icons/fa'
import { dashboardOther, settingsSystem } from '~/layouts/DefaultLayout/components/Sidebar/components'
import {
  useEditCategoriesTreeMutation,
  useGetCategoriesDepartmentsQuery,
  useRemoveCategoriesTreeMutation
} from '~/apis/category/categories'
import { toastService } from '~/utils/toask/toaskMessage'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
export const CategoryTreeItem = React.memo(({ category, level, bg, button }: any) => {
  console.log(category,"category")
  const location = useLocation()
  const { id } = useParams()
  const [removeCategoriTree] = useRemoveCategoriesTreeMutation()
  const [editCategoriTree] = useEditCategoriesTreeMutation()
  const [open, setOpen] = useState(false)
  const [dataTree, setDataTree] = useState<any[]>([])
  const [queryParameters] = useSearchParams()
  const parentId: string | null = queryParameters.get('parentId')
  const navigate = useNavigate()
  const { data: dataCategoriTree, isLoading, isFetching } = useGetCategoriesDepartmentsQuery(id)
  const [isOpen, setIsOpen] = useState(() => {
    const openCategories = JSON.parse(sessionStorage.getItem('openCategories') || '{}')
    return !!openCategories[category?._id]
  })
  const showDrawer = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    {
      bg
        ? navigate({
            search: createSearchParams({
              category: category?._id
            }).toString()
          })
        : navigate({
            pathname: `category/${category._id}`,
            search: createSearchParams({
              category: category?._id
            }).toString()
          })
    }
  }
  const handleCategoryClickDetails = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate({
      pathname: `category/${category._id}`,
      search: createSearchParams({
        category: category?._id
      }).toString()
    })
  }
  const toggleOpen = () => {
    setIsOpen((prevState) => {
      const newState = !prevState
      const openCategories = JSON.parse(sessionStorage.getItem('openCategories') || '{}')
      if (newState) {
        openCategories[category._id] = true
      } else {
        delete openCategories[category._id]
      }
      sessionStorage.setItem('openCategories', JSON.stringify(openCategories))
      return newState
    })
  }
  const handelRemoveCategori = (e: React.MouseEvent) => {
    e.stopPropagation()
    const checkCofirm = window.confirm('Are you sure you want to remove')
    if (checkCofirm)
      removeCategoriTree(category._id)
        .unwrap()
        .then(() => {
          toastService.success('Removed')
          sessionStorage.removeItem('categories')
        })
        .catch(() => toastService.error('Error removing'))
  }
  const onFinish = (values: any) => {
    console.log(values)
    editCategoriTree({
      id: category._id as string,
      parentId: parentId || '',
      name: values.name
    })
      .unwrap()
      .then(() => {
        toastService.success('categories updated successfully')
        sessionStorage.removeItem('categories')
        setTimeout(() => window.location.reload())
      })
  }
  useEffect(() => {
    logChildrenNames(dataCategoriTree)
  }, [])
  const logChildrenNames = (node: any, accumulatedData: any[] = []) => {
    accumulatedData.push(node)
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        logChildrenNames(child, accumulatedData)
      })
    }
    setDataTree(accumulatedData)
  }
  const confirm = (id: string) => {
    navigate({
      search: createSearchParams({
        parentId: id
      }).toString()
    })
  }
  const dataSource = dataTree.map(({ _id, name }: { _id: string; name: string }) => ({
    key: _id,
    name: name
  }))
  const columns = [
    {
      title: 'Tên Categories',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: <p className='flex justify-center'>hành động</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center'>
            <Popconfirm
              okButtonProps={{
                style: { backgroundColor: 'blue', marginRight: '20px' }
              }}
              title='Dịch Chuyển Categories'
              description='Are you sure to delete this task?'
              onConfirm={() => confirm(id)}
              okText='Yes'
              cancelText='No'
            >
              <Button styleClass='py-1 '>Chọn</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <div className=''>
      <Drawer
        title='cấu hình categories'
        placement={'right'}
        width={500}
        onClose={onClose}
        open={open}
        extra={<Button onClick={onClose}>Cancel</Button>}
      >
        <p className='mb-3'>Nhập Tên Categories Mới</p>
        <Form
          name='basic'
          style={{ minWidth: '100%' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
        >
          <Form.Item
            className='min-w-full'
            name='name'
            rules={[{ required: true, message: 'Please input your Categories name!' }]}
          >
            <Input className='border border-[#ccc] min-w-full' />
          </Form.Item>
          <p>Categories Thuộc</p>
          <Form.Item
            className='min-w-full'
            rules={[{ required: false, message: 'Please input your Categories name!' }]}
          >
            <div className='mt-2'>
              <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
          </Form.Item>
          <Form.Item className='min-w-full'>
            <Button type='submit' styleClass='w-full'>
              Xác Nhận
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      {isLoading || isFetching ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <div className={`${bg ? 'bg-white' : 'bg-[#000c17]'} rounded-md`}>
          <div onClick={toggleOpen} className='cursor-pointer px-3 py-2 '>
            <div className='category-item relative flex justify-between gap-5'>
              <div className='flex gap-2 items-center  '>
                {category?.children && category.children.length > 0 ? (
                  <span className='mr-3'>{isOpen ? '-' : '+'}</span>
                ) : null}
                <span
                  className={`category-name   hover:text-md ${
                    bg ? 'hover:text-black' : 'hover:text-white'
                  } hover:font-semibold flex gap-5 items-center`}
                  onClick={handleCategoryClick}
                >
                  {category?.name} <FaRegFolderOpen className='text-2xl' />
                </span>
              </div>
              <div>
                {button && category?.children && (
                  <div className='space-x-5 py-2'>
                    <button onClick={showDrawer} className='font-bold text-success underline'>
                      Edit
                    </button>
                    <button onClick={handleCategoryClickDetails} className='font-bold text-success underline'>
                      Chi Tiết
                    </button>
                    <button onClick={handelRemoveCategori} className='font-bold text-danger underline'>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className={`ml-5 space-y-1 transition-all opacity-100 `}>
              {category.children &&
                category.children.map((child: any) => (
                  <CategoryTreeItem
                    key={child._id}
                    category={child}
                    level={level + 1}
                    bg={bg}
                    button={button ? true : false}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
})
const SidebarTree = ({ sidebarOpen, setSidebarOpen, textUi }: SidebarProps) => {
  const navigate = useNavigate()
  const trigger = useRef<any>(null)
  const idCate = localStorage.getItem('idCategories')
  console.log(idCate)
  const { id } = useParams()
  const sidebar = useRef<any>(null)
  const isActive = location.pathname.includes(`all-folders`)
  const isActiveKT = location.pathname.includes(`ki-thi`)

  console.log(isActive)
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, _] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
  return (
    <div
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#001529] duration-300 ease-linear dark:bg-[#001529] lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className='lg:py-6 flex items-center justify-between gap-2 px-3 py-5'>
        <p style={{ color: 'red' }} className='pl-5 font-medium  text-xl font-mono'>
          {textUi}
        </p>
        <span className='z-10'>
          <Tooltip placement='right' title={'Quay Lại Trang Home !'}>
            <NavLink to='/'>
              <AiFillHome className='text-[30px]' />
            </NavLink>
          </Tooltip>
        </span>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='lg:hidden block'
        >
          <BarsIcon />
        </button>
      </div>
      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        <Menu
          theme='dark'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode='inline'
          items={dashboardOther}
        />
        <nav className='px-3 mt-5'>
          <div className='select-none'>
            <h3
              onClick={() =>   navigate(`/tree-menu/${idCate}/all-folders`)
              }
              className={`${
                isActive ? 'bg-success  pl-4' : ''
              } text-white mb-4 flex items-center  cursor-pointer  ml-4  py-2 rounded-md   text-sm font-semibold select-none`}
            >
              <span className='pr-5'>
                <FaRegFolderOpen className='text-2xl' />
              </span>
              <span> Thư Mục</span>
            </h3>
          </div>
        </nav>
      </div>
      <p
        className={`${
          isActiveKT ? 'bg-success ' : ''
        }flex items-center gap-3 mt-3 start pl-[26px] cursor-pointer hover:bg-body py-2 rounded-md`}
        onClick={() => navigate(`/tree-menu/${idCate}/settings/ki-thi`)}
      >
        <span>
          <AiFillSetting className='text-white text-2xl' />
        </span>
        <span className='text-md text-bodydark1 font-medium'>Kì Thi</span>
      </p>
    </div>
  )
}
export default React.memo(SidebarTree)
