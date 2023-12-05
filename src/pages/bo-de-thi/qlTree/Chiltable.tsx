import React from 'react'
import { Table } from 'antd'
import plusAdd from '../../../assets/minus-circle.png'
import plust from '../../../assets/add (1).png'
import { updateCount, updatePoint } from '~/store/slice/checkCategories'
import { useAppDispatch } from '~/store/root/hook'

export default function TableChildrend({ questionSet, id }: any) {
  const dispatch = useAppDispatch()

  const handlePlusAddClick = (index: number) => {
    dispatch(
      updatePoint({
        id: id,
        index: index,
        value: 1
      })
    )
  }

  const handlePlusDeClick = (index: number) => {
    dispatch(
      updatePoint({
        id: id,
        index: index,
        value: -1
      })
    )
  }

  const handlePlustClick = (index: number) => {
    dispatch(
      updateCount({
        id: id,
        index: index,
        value: 1
      })
    )
  }

  const handlePlustDeClick = (index: number) => {
    dispatch(
      updateCount({
        id: id,
        index: index,
        value: -1
      })
    )
  }

  const columns = [
    {
      title: <p className='!flex !justify-center'>point</p>,
      dataIndex: 'point',
      key: 'point',
      render: (point: any, record: any, index: number) => (
        <div className='flex justify-center items-center gap-3'>
          <img
            onClick={() => handlePlusDeClick(index)}
            className='w-[25px]  cursor-pointer hover:scale-110'
            alt='plus-de'
            src={plusAdd}
          />
          <p className='flex justify-center'>{point}</p>
          <img
            onClick={() => handlePlusAddClick(index)}
            className='w-[25px] cursor-pointer hover:scale-110'
            src={plust}
            alt='plus-add'
          />
        </div>
      )
    },
    {
      title: <p className='!flex !justify-center items-center'>count</p>,
      dataIndex: 'count',
      key: 'count',
      render: (count: any, record: any, index: number) => (
        <div className='flex justify-center items-center gap-3'>
          <img
            onClick={() => handlePlustClick(index)}
            className='w-[25px] cursor-pointer hover:scale-110'
            alt='plust-add'
            src={plust}
          />
          <p className='flex justify-center'>{count}</p>
          <img
            onClick={() => handlePlustDeClick(index)}
            className='w-[25px] cursor-pointer hover:scale-110'
            src={plusAdd}
            alt='plust-de'
          />
        </div>
      )
    }
  ]

  const dataPush = questionSet?.map((item: any) => ({
    point: item.point,
    count: item.count
  }))

  return <Table className='my-3' bordered columns={columns} dataSource={dataPush} pagination={false} />
}
