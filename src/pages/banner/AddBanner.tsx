import { Image, Pagination, Popconfirm, Skeleton, Table } from 'antd'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteBannerMutation, useGetAllBannersQuery } from '~/apis/banner/banner.api'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
const AddBanner = () => {
  const { data, isFetching } = useGetAllBannersQuery()
  const { t } = useTranslation(['header'])
  const uri = import.meta.env.VITE_API
  const navigate = useNavigate()
  const [removeBanner] = useDeleteBannerMutation()
  const confirm = (id: string) => {
    removeBanner(id)
      .unwrap()
      .then(() => toastService.success('Banner successfully deleted'))
  }
  const dataSource = data?.banners.map((item: any, index: any) => ({
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
      title: 'tên banner',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: string) => {
        const checkColor = text == '0' ? 'text-danger' : 'text-success'
        return <p className={`${checkColor} font-bold text-md`}>{text == '0' ? 'Banner Login ' : 'Banner Home'}</p>
      }
    },
    {
      title: 'images',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        return <Image width={200} src={`${uri}${text}`} />
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
          ></Popconfirm>
          <Button styleClass='flex items-center ' onClick={() => navigate(`/admin/banner/${id}/edit`)}>
            <span>
              <AiFillEdit />
            </span>
            <span>{t('product.edit_banner')}</span>
          </Button>
        </div>
      )
    }
  ]
  return (
    <div>
      {isFetching ? (
        <Skeleton />
      ) : (
        <div className='mt-2'>
          <Table dataSource={dataSource} pagination={false} columns={columns} />
        </div>
      )}
      <Footer className='mt-5 flex justify-between dark:bg-black '>
        <div className='text-md font-semibold text-center dark:text-white'>
          Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.
        </div>
        <div className='text-md font-semibold text-center dark:text-white'>design by thanhdo IS.</div>
      </Footer>
    </div>
  )
}

export default AddBanner
