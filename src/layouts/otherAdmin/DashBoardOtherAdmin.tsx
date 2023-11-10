import React, { useContext } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import CardOne from '~/components/card/CartOne'
const DashBoardOtherAdmin = () => {
  const { profile, reset } = useContext(AppContext)
  console.log(profile)
  return (
    <div>
      <p className='text-[22px] text-[#2C323F] font-semibold'>Welcome {profile?.username}!</p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-3'>
        <CardOne member={true} departMent={false} />
      </div>
    </div>
  )
}

export default DashBoardOtherAdmin
