import { AreaChart } from '~/components/Charts'

import { DoughnutChart } from '~/components/Charts/DoughnutChart'
import { GroupedBarChart } from '~/components/Charts/GroupedBarChart'
import { VerticalBarChart } from '~/components/Charts/VerticalBarChart'
import CardOne from '~/components/card/CartOne'
const FeatureDashboard = () => {
  return (
    <>
      <p className='text-[22px] text-[#2C323F] font-semibold'>Welcome Admin!</p>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-3'>
        <CardOne member={true} departMent={false} />
        <CardOne member={false} departMent={true} />
      </div>
      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <VerticalBarChart />
        <GroupedBarChart />
        <DoughnutChart />
        <AreaChart />
      </div>
    </>
  )
}

export default FeatureDashboard
