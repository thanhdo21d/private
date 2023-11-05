import { Select, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useGetAllCategoriesQuery } from '~/apis/category/categories'
import { useGetIdRolesQuery } from '~/apis/roles/roles.api'

const Setting = () => {

  return (
    <div>
      <div className='w-full h-[65px] flex items-center bg-graydark mt-5'>
        <p className='text-2xl font-medium text-white text-left pl-5'>Phân quyền other admin</p>
      </div>
    </div>
  )
}

export default Setting
