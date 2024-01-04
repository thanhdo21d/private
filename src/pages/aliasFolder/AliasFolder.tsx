import { Drawer, Form, Input, Popconfirm, Table, Tooltip, Button as ButtonAnt } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { Button } from '~/components'
import Pagination from '../roles/Pagination'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import {
  useDefaultAliasMutation,
  useGetIdAliasFoldersQuery,
  useQueryAliasAllQuery,
  useRemoveAliasDepartmentMutation
} from '~/apis/aliasFolder/aliasFolder'
import detailsEye from '../../assets/cartoon-happy-eyes.png'
import editIcon from '../../assets/compose.png'
import addIcons from '../../assets/add.png'
import removeIcons from '../../assets/delete.png'
import settingAlias from '../../assets/settings.png'
import checkDefault from '../../assets/check.png'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
const AliasFolder = () => {
  const idCate = localStorage.getItem('idCategories')
  const [queryParameters] = useSearchParams()
  const details: string | null = queryParameters.get('details')
  const checkEdit: string | null = queryParameters.get('edit')
  const {
    data: dataAliasFoldersId,
    isLoading: isAliasIDLoading,
    isFetching: isAliasIdFetching
  } = useGetIdAliasFoldersQuery(details || '')
  const search: string | null = queryParameters.get('search')
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const {
    data: dataAlias,
    isFetching,
    isLoading
  } = useQueryAliasAllQuery({
    id: idCate,
    search: search
  })
  const [removeAlias] = useRemoveAliasDepartmentMutation()
  const [defaultAlias] = useDefaultAliasMutation()
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const handelRemoveAlias = (id: string) => {
    const checkCf = window.confirm('bạn có muốn xóa ')
    if (checkCf)
      removeAlias({
        id: idCate,
        idAlias: id
      })
        .unwrap()
        .then(() => toastService.success('remove alias successfully '))
        .catch(() => toastService.error('remove alias falsed'))
  }
  const confirm = (id: string) => {
    console.log(id)
    defaultAlias({
      id: id,
      checkAlias: '1',
      idCategory: idCate
    })
      .unwrap()
      .then(() => toastService.success('default alias successfully '))
      .catch(() => toastService.error('default alias falsed'))
  }
  const dataSource = dataAlias?.alias.map((alias: any) => ({
    key: alias._id,
    name: alias.name,
    checkAlias: alias.checkAlias
  }))
  const columns = [
    {
      title: 'Alias Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => {
        console.log(name)
        return <p>{name}</p>
      }
    },
    {
      title: <p className='flex justify-center'>tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center gap-10'>
            <div className='flex items-center gap-5'>
              <p>
                <Tooltip title='chi tiết'>
                  <img
                    onClick={() => {
                      showDrawer()
                      return navigate({
                        search: createSearchParams({
                          details: id
                        }).toString()
                      })
                    }}
                    className='w-[35px] cursor-pointer hover:scale-110'
                    src={detailsEye}
                  />
                </Tooltip>
              </p>
              <p>
                <Tooltip title='xóa'>
                  <img
                    onClick={() => handelRemoveAlias(id)}
                    className='w-[35px] cursor-pointer hover:scale-110'
                    src={removeIcons}
                  />
                </Tooltip>
              </p>
              <p>
                {/* <Tooltip title='sửa'>
                  <img
                    onClick={() => {
                      showDrawer()
                      return navigate({
                        search: createSearchParams({
                          details: id,
                          edit: '1'
                        }).toString()
                      })
                    }}
                    className='w-[35px] cursor-pointer hover:scale-110'
                    src={editIcon}
                  />
                </Tooltip> */}
              </p>
            </div>
            <div>
              <p>
                <Tooltip title='default alias'>
                  <Popconfirm
                    title='Đặt làm alias mặc định'
                    description='bạn có chắc  đặt làm alias mặc định?'
                    onConfirm={() => confirm(id)}
                    okButtonProps={{
                      style: { backgroundColor: 'blue' }
                    }}
                    okText='Yes'
                    cancelText='No'
                  >
                    <img className='w-[35px] cursor-pointer hover:scale-110' src={settingAlias} />
                  </Popconfirm>
                </Tooltip>
              </p>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Alias Default',
      render: ({ checkAlias }: { checkAlias: string }) => {
        return (
          <p>{checkAlias == '0' ? <p></p> : <img className='w-[35px] shadow-2xl waving-image' src={checkDefault} />}</p>
        )
      }
    }
  ]
  const onFinish = ({ keyword }: any) => {
    const keywordSpace = keyword.trim()
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: keywordSpace
      }).toString()
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    navigate({
      search: createSearchParams({
        ...queryConfig,
        search: ''
      }).toString()
    })
  }
  const handleAddSubFolder = (folderPath: any) => {
    console.log(folderPath)
    const subFolderName = prompt('Nhập tên mới ')
    if (subFolderName) {
      console.log('1')
    }
  }
  const renderCategory = (category: any, data: any, level: any) => {
    console.log(data, '1)')
    const listName = typeof data === 'object'
    const indent = 10
    const marginLeft = `${level * indent}px`
    return (
      <li key={category} style={{ marginLeft }}>
        <p className='flex items-center gap-7 py-1'>
          <strong>{category} </strong>
          {checkEdit && <ButtonAnt onClick={() => handleAddSubFolder(data)}>edit</ButtonAnt>}
        </p>
        {typeof data === 'object' ? (
          <ul>
            {Object.keys(data).map((subCategory) => {
              console.log(data)
              return (
                <React.Fragment key={subCategory}>
                  <p className='flex items-center gap-7'>{renderCategory(subCategory, data[subCategory], level + 1)}</p>
                </React.Fragment>
              )
            })}
          </ul>
        ) : (
          <> {data ? <span>{`${category}: ${data}`}</span> : null}</>
        )}
      </li>
    )
  }
  const renderData = (data: any) => {
    return (
      <ul>
        {details &&
          Object.keys(data).map((category) => (
            <React.Fragment key={category}>{renderCategory(category, data[category], 0)}</React.Fragment>
          ))}
      </ul>
    )
  }
  if (isLoading || isFetching) return <div>loading ....</div>
  return (
    <div>
      <div className='flex items-center mb-8 justify-between'>
        <div>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className='flex gap-5  justify-center'
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 900 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item name='keyword' rules={[{ required: true, message: 'Please input your keyword!' }]}>
              <Input
                className='h-[40px] w-[400px] 2xl:w-[600px] border border-[#ccc]'
                placeholder='Tìm Kiếm Theo alias name ....'
              />
            </Form.Item>
            <Button type='submit' id='keycode13' styleClass='w-[150px] h-[40px] bg-graydark hover:bg-success'>
              Tìm Kiếm
            </Button>
          </Form>
        </div>
        <div className='flex justify-end'>
          <Tooltip title='Thêm Mới Alias' placement='left'>
            <img
              onClick={() => navigate('create')}
              className='w-[50px] mb-5 cursor-pointer hover:scale-110'
              src={addIcons}
            />
          </Tooltip>
        </div>
      </div>
      <Table dataSource={dataSource} columns={columns} pagination={false} />
      <Drawer title='Basic Drawer' width={600} placement='right' onClose={onClose} open={open}>
        {isAliasIDLoading || isAliasIdFetching ? (
          <div>loading....</div>
        ) : (
          <div>
            <p className='text-black underline font-bold pb-5 '>{dataAliasFoldersId?.name}</p>
            {renderData(dataAliasFoldersId?.data)}
          </div>
        )}
      </Drawer>
      <div>
        <Footer className='mt-5 2xl:flex justify-between dark:bg-black '>
          <div className='text-md font-semibold text-center dark:text-white'>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            Design by thanhdo
          </div>
          <div>
            {/* <Pagination pageSize={32} queryConfig={queryConfig} /> */}
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default AliasFolder
