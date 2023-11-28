import { Table } from 'antd'

export default function TableChildrend({ products }: any) {
  const columns = [
    {
      title: 'point',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'count',
      dataIndex: 'image',
      key: 'image',

      render: (image: any) => (
        <img src={image} className='object-cover w-20 h-20 rounded-lg cursor-pointer mb-1' alt='' />
      )
    }
  ]

  const dataPush = products?.map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    size: item.size,
    topping: item.toppings,
    price: item.price,
    image: item.image
  }))

  return <Table className='my-3' bordered columns={columns} dataSource={dataPush} pagination={false} />
}
