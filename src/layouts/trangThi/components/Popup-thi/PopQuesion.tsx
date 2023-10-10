import React from 'react'
import CheckQuesion from '../check-quesion/CheckQuesion'

const PopQuesion = () => {
  return (
    <div className='flex justify-between'>
      <div>
        <p className='text-xl font-bold'>Chọn đáp án sai về chất bôi trơn.</p>
      </div>
      <div className=''>
        <CheckQuesion />
      </div>
    </div>
  )
}

export default PopQuesion
