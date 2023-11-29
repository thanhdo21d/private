import { Table } from 'antd'

export default function TableChildrend({ questionSet }: any) {
  console.log(questionSet, 'product day nay')
  const columns = [
    {
      title: <p className='!flex !justify-center'>point</p>,
      dataIndex: 'point',
      key: 'point',
      render: (point: any) => <p className='flex justify-center'>{point}</p>
    },
    {
      title: <p className='!flex !justify-center items-center'>count</p>,
      dataIndex: 'count',
      key: 'count',
      render: (count: any) => <p className='flex justify-center'>{count}</p>
    }
  ]

  const dataPush = questionSet?.map((item: any) => ({
    point: item.point,
    count: item.count
  }))

  return <Table className='my-3' bordered columns={columns} dataSource={dataPush} pagination={false} />
}
