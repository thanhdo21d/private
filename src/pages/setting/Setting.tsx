import { Select, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { useGetAllCategoriesQuery } from '~/apis/category/categories'
import { useGetIdRolesQuery } from '~/apis/roles/roles.api'

const Setting = () => {
  const { data: roleData, error, isFetching: isGetRoleLoading } = useGetIdRolesQuery('651f7c22c94c6d83288d41f1')
  const { data: dataAllCategories, isFetching: isGetCategoriesLoading } = useGetAllCategoriesQuery()
  const OPTIONS = dataAllCategories?.data
    ?.filter((items: any) => items.parentCheck !== '0')
    .map((data: any) => ({
      id: data._id,
      name: data.name
    }))
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedItemIds, setSelectedItemIds] = useState([])
  const filteredOptions = OPTIONS?.filter((o) => !selectedItemIds.includes(o.id))

  const handleSelectChange = (selectedValues: any) => {
    const selectedIds = selectedValues?.map((value: any) => OPTIONS.find((option: any) => option.name === value).id)
    setSelectedItems(selectedValues)
    setSelectedItemIds(selectedIds)
  }

  const handleButtonClick = () => {
    console.log(selectedItemIds)
  }
  useEffect(() => {
    // setSelectedItems()
    console.log(roleData?.data.adminDepartMent)
    if (roleData) {
      roleData?.data.adminDepartMent?.map((name: any) => setSelectedItems(name.name))
    }
  }, [roleData])
  return (
    <div>
      <div className='w-full h-[65px] flex items-center bg-graydark mt-5'>
        <p className='text-2xl font-medium text-white text-left pl-5'>Phân quyền other admin</p>
      </div>
      <Select
        mode='multiple'
        placeholder='Inserted are removed'
        value={selectedItems}
        onChange={handleSelectChange}
        style={{ width: '100%' }}
        options={filteredOptions?.map((item) => ({
          value: item.name,
          label: item.name
        }))}
      />
      <Button onClick={handleButtonClick}>Push to Array</Button>
    </div>
  )
}

export default Setting
