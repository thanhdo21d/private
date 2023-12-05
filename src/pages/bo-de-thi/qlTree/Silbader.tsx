/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useEffect, useRef, useState } from 'react'
import { BarsIcon, Button } from '~/components'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import { Checkbox, Drawer, Form, Input, Menu, Popconfirm, Select, Skeleton, Space, Table, Tooltip } from 'antd'
import { NavLink, createSearchParams, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AiFillHome, AiFillSetting, AiOutlineDashboard } from 'react-icons/ai'
import { FaRegFolderOpen } from 'react-icons/fa'
import { dashboardOther, settingsAlias, settingsSystem } from '~/layouts/DefaultLayout/components/Sidebar/components'
import checkIcons from '../../../assets/check.png'
import unCheckIcons from '../../../assets/unchecked.png'
import serviceIcons from '../../../assets/technical-support.png'

import examsIcons from '../../../assets/exam.png'

import folder from '../../../assets/folder.png'

import {
  useEditCategoriesTreeMutation,
  useGenerateAliasFoldersMutation,
  useGetCategoriesDepartmentsQuery,
  useRemoveCategoriesTreeMutation
} from '~/apis/category/categories'
import { toastService } from '~/utils/toask/toaskMessage'
import { useAppDispatch } from '~/store/root/hook'
import { setDataCategoires } from '~/store/slice/checkCategories'
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (arg: boolean) => void
  textUi: string
  checkInfo?: boolean
}
export const CategoryTreeItem = React.memo(({ category, level, bg, button, createExams, checkMember }: any) => {
  console.log(category, 'category')
  const [inputFields, setInputFields] = useState<any>([{ point: '', count: '' }])
  const dispatch = useAppDispatch()
  const [generateAliasFolders] = useGenerateAliasFoldersMutation()
  const { id } = useParams()
  const idCate = localStorage.getItem('idCategories')
  const [removeCategoriTree] = useRemoveCategoriesTreeMutation()
  const [isChecked, setIsChecked] = useState(false)
  const [editCategoriTree] = useEditCategoriesTreeMutation()
  const [open, setOpen] = useState(false)
  const [openExams, setOpenExams] = useState(false)
  const [dataTree, setDataTree] = useState<any[]>([])
  const [queryParameters] = useSearchParams()
  const searchKeyword: string | null = queryParameters.get('keyword')
  const parentId: string | null = queryParameters.get('parentId')
  const navigate = useNavigate()
  const {
    data: dataCategoriTree,
    isLoading,
    isFetching
  } = useGetCategoriesDepartmentsQuery({
    id: idCate as string,
    name: searchKeyword || ''
  })
  console.log(dataCategoriTree)
  const [isOpen, setIsOpen] = useState(() => {
    const openCategories = JSON.parse(sessionStorage.getItem('openCategories') || '{}')
    return !!openCategories[category?._id]
  })
  const showDrawer = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true)
  }
  const showDrawerExams = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenExams(true)
  }
  const onCloseExams = () => {
    setOpenExams(false)
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
  const toggleOpen = (e: any) => {
    e.stopPropagation()
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
      parentId: parentId || category.parent,
      name: values.name
    })
      .unwrap()
      .then(() => {
        toastService.success('categories updated successfully')
        sessionStorage.removeItem('categories')
        // setTimeout(() => window.location.reload())
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
  const handleInputChange = (index: any, event: any) => {
    const { name, value } = event.target
    const values = [...inputFields]
    values[index][name] = value
    setInputFields(values)
  }
  const handleAddFields = () => {
    setInputFields([...inputFields, { point: '', count: '' }])
  }
  const handleRemoveFields = (index: any) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }
  const handelCopyID = () => {
    const textarea = document.createElement('textarea')
    textarea.value = category._id
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    toastService.success(`Copied "${category._id}" to clipboard`)
  }
  const hanelGenerateALiasFolders = (id: string) => {
    generateAliasFolders({ id: id, idCate: idCate as string })
      .unwrap()
      .then(() => {
        toastService.success('generate success')
        sessionStorage.removeItem('categories')
      })
      .catch(() => toastService.error('error'))
  }
  return (
    <div className=''>
      <Drawer
        title='Details Questions'
        placement={'right'}
        width={900}
        className='absolute z-10000000'
        onClose={onCloseExams}
        open={openExams}
        extra={
          <Space>
            <Button styleClass='py-2' onClick={onCloseExams}>
              Cancel
            </Button>
          </Space>
        }
      >
        <div>
          <div>
            <div className='bg-[#D9D9D9] w-full rounded-md h-screen relative'>
              <h3 className='text-center pt-4 text-xl text-black underline'>{category.name}</h3>
              {inputFields.map((inputField: any, index: any) => {
                return (
                  <div
                    key={index}
                    className='bg-white w-11/12 h-[60px] mx-auto rounded-md border mt-5 flex justify-between items-center'
                  >
                    <div className='mx-5 flex items-center gap-3'>
                      <p className='text-xl text-black'>Points</p>
                      <input
                        className='rounded-md'
                        placeholder='points'
                        type='text'
                        name='point'
                        value={inputField.x}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    </div>
                    <div className='flex items-center gap-5'>
                      <div className='flex items-center gap-3'>
                        <p className='text-xl text-black'>Count</p>
                        <input
                          className='rounded-md'
                          placeholder='Count'
                          type='text'
                          name='count'
                          value={inputField.y}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                      </div>
                      <div className='mx-5'>
                        {index !== 0 && (
                          <img
                            className='w-[30px] hover:scale-110 cursor-pointer'
                            src={closeIcons}
                            alt='close'
                            onClick={() => handleRemoveFields(index)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div className='w-fit h-fit mx-auto rounded-md mt-5'>
                <img
                  className='w-[40px] hover:scale-110 cursor-pointer'
                  src={addIcons}
                  alt='add'
                  onClick={handleAddFields}
                />
              </div>
            </div>
            <div className='absolute bottom-10 mx-auto flex justify-center items-center w-full'>
              <Button
                onClick={() => {
                  dispatch(
                    setDataCategoires({
                      id: category._id,
                      name: category.name,
                      checked: true,
                      questionSets: inputFields
                    })
                  )
                  onCloseExams()
                }}
                styleClass='py-2 w-2/3 bg-[#24A19C]'
              >
                Xác Nhận
              </Button>
            </div>
          </div>
          )
        </div>
      </Drawer>
      <Drawer
        title='cấu hình categories'
        placement={'right'}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <div>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        }
      >
        <p className='mb-3'>Nhập Tên Categories Mới</p>
        <Form
          name='basic'
          style={{ minWidth: '100%' }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: '100%' }}
          initialValues={{ name: category?.name, remember: true }}
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
          <div className='cursor-pointer px-3 py-2 '>
            <div className='category-item relative flex justify-between gap-5'>
              <div className='flex gap-2 items-center  '>
                {category?.children && category.children.length > 0 ? (
                  <span
                    onClick={toggleOpen}
                    className='mr-3 p-2 w-[25px] h-[25px] flex justify-center items-center text-xl hover:font-bold hover:scale-115 bg-black rounded-full text-white'
                  >
                    {isOpen ? '-' : '+'}
                  </span>
                ) : null}
                <span
                  className={`category-name   hover:text-md ${
                    bg ? 'hover:text-black' : 'hover:text-white'
                  } hover:font-semibold flex gap-5 items-center`}
                  onClick={handleCategoryClick}
                >
                  {category?.name}
                  {category?.children && category.children.length > 0 && <img className='w-[30px]' src={folder} />}
                </span>
              </div>
              {createExams && (
                <div className='py-2'>
                  <button
                    className='w-[100px] h-[30px] bg-body hover:bg-success hover:scale-105 ease-in-out text-white font-medium rounded-md'
                    onClick={showDrawerExams}
                  >
                    chọn
                  </button>
                </div>
              )}
              {button && !createExams && category?.children && (
                <div className='space-x-5 gap-5 py-2 flex items-center'>
                  <div>
                    <Popconfirm
                      okButtonProps={{
                        style: { backgroundColor: 'blue', marginRight: '20px' }
                      }}
                      onConfirm={handelCopyID}
                      onCancel={() => hanelGenerateALiasFolders(category._id)}
                      placement='top'
                      title={'service'}
                      description={'service copy and generate'}
                      okText='Copy Path'
                      cancelText='Generate Folder'
                    >
                      <img className='w-[33px] shadow-2xl cursor-pointer hover:scale-110' src={serviceIcons} alt='' />
                    </Popconfirm>
                  </div>
                  <div className='flex items-center gap-5'>
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
                </div>
              )}
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
                    createExams={createExams ? true : false}
                    checkMember={checkMember ? true : false}
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
  const { id } = useParams()
  const sidebar = useRef<any>(null)
  const isActive = location.pathname.includes(`all-folders`)
  const isActiveKT = location.pathname.includes(`ki-thi`)
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, _] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true')
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [])
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [])
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])
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
          className=' block'
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
        <nav className=' mt-5'>
          <div className='select-none'>
            <h3
              onClick={() => navigate(`/tree-menu/${idCate}/all-folders`)}
              className={`${
                isActive ? 'bg-success' : ''
              } text-white mb-4 flex items-center  cursor-pointer    py-2 rounded-md   text-sm font-semibold select-none`}
            >
              <span className='pr-5 pl-7'>
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
          <img className='w-[30px]' src={examsIcons} />
        </span>
        <span className='text-md text-bodydark1 font-medium'>Kì Thi</span>
      </p>
      <Menu theme='dark' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' items={settingsAlias} />
    </div>
  )
}
export default React.memo(SidebarTree)
