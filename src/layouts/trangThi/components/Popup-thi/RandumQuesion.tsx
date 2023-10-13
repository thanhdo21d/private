import React from 'react'
import { Button } from '~/components'
import { TiTick } from 'react-icons/ti'
import { AiOutlineEnter } from 'react-icons/ai'
const RandumQuesion = () => {
  return (
    <div>
      <div className='text-danger'>
        RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis sint quo eum tempore veritatis
        iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente eligendi quia? Dolore nisi cum sit nihil.
        RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis sint quo eum tempore veritatis
        iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente eligendi quia? Dolore nisi cum sit nihil.
        RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis sint quo eum tempore veritatis
        iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente eligendi quia? Dolore nisi cum sit nihil.
      </div>

      <div className='flex justify-center mx-auto !mt-10'>
        <div className='grid-cols-1	mx-auto  gap-5 grid'>
          <div
            className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
          >
            <span className='font-bold text-xl pl-5 text-black'>A </span> :{' '}
            <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
          </div>
          <div
            className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
          >
            <span className='font-bold text-xl pl-5 text-black'>B </span> :{' '}
            <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
          </div>
          <div
            className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
          >
            <span className='font-bold text-xl pl-5 text-black'>C </span> :{' '}
            <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
          </div>
          <div
            className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
          >
            <span className='font-bold text-xl pl-5 text-black'>D </span> :{' '}
            <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
          </div>
        </div>
      </div>

      <div className='flex mx-auto justify-center items-center gap-5 mt-50'>
        <div className='text-md flex items-center cursor-pointer font-bold text-black'>
          Quay Lại <AiOutlineEnter size={22} />
        </div>
        <div>
          <Button styleClass='cursor-pointer'>
            {' '}
            submit <TiTick />
          </Button>
        </div>

        <div className='text-md flex items-center font-bold text-black'>hoặc ấn ENTER</div>
      </div>
    </div>
  )
}

export default RandumQuesion
