import { Pagination, Popconfirm, Skeleton, Table } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDeleteBannerMutation, useGetAllBannersQuery } from '~/apis/banner/banner.api'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
const AddBanner = () => {
  const { data, isFetching } = useGetAllBannersQuery()
  const { t } = useTranslation(['header'])
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
        return <img className='w-[200px] h-[100px]' src={`${text}`} />
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
          <Button>
            <Link to={`/admin/banner/${id}/edit`}>{t('product.edit_banner')}</Link>
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
          <div className='mt-5 float-right'>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddBanner
