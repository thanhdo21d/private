import React, { useContext } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import CardOne from '~/components/card/CartOne'
import { useGetAnalyticDepartmentQuery } from '~/apis/analytics/analyticDepartment'
import { Skeleton } from 'antd'
const DashBoardOtherAdmin = () => {
  const { profile, reset } = useContext(AppContext)
  const idCategories = localStorage.getItem('idCategories')
  //useGetAnalyticDepartmentQuery
  const { data: dataAnalysisAdmin, isLoading, isFetching } = useGetAnalyticDepartmentQuery(idCategories as string)

  console.log(profile)
  if (isFetching || isLoading)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div>
      <p className='text-[22px] text-[#2C323F] font-semibold'>Welcome {profile?.username}!</p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-3'>
        <CardOne data={dataAnalysisAdmin} user={true} />
        <CardOne data={dataAnalysisAdmin} exam={true} depaermenrt={false} user={false} otherAdmin={false} />
      </div>
    </div>
  )
}

export default DashBoardOtherAdmin
