import { Tabs } from 'antd'
import { items } from './data'

export const ToppingFeature = () => {
  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} className='text-white' />
    </div>
  )
}
