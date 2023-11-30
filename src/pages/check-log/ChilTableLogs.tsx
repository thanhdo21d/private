import { Table } from 'antd'

export default function ChilTableLogs({ data }: any) {
  console.log(data, 'product day nay')
  return null
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

  const checkParentLogs = data?.map((item: any) => ({
    point: item.point,
    count: item.count
  }))

  return <Table className='my-3' bordered columns={columns} dataSource={checkParentLogs} pagination={false} />
}
