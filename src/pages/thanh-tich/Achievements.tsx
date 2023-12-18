import { Skeleton } from 'antd'
import { useContext } from 'react'
import { useGetAnalyticUserQuery } from '~/apis/analytics/analyticUser'
import { AreaChart } from '~/components/Charts'
import { AppContext } from '~/contexts/app.contexts'
import { MonthlyRevenue } from './components/TotalPoint'
import CartThree from '~/components/card/CartThree'

const Achievements = () => {
  const { profile } = useContext(AppContext)
  const {
    data: dataAnalyticsUser,
    isFetching,
    isLoading
  } = useGetAnalyticUserQuery({
    id: profile?._id as string
  })
  if (isFetching || isLoading)
    return (
      <>
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </>
    )
  return (
    <div>
      <div className='grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CartThree data={dataAnalyticsUser} />
      </div>
      <div>
        <MonthlyRevenue data={dataAnalyticsUser} />
      </div>
    </div>
  )
}

export default Achievements
