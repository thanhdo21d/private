import React, { useState } from 'react'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import checkIcons from '../../../assets/check.png'
import unCheckIcons from '../../../assets/unchecked.png'

import { Button } from '~/components'
import { Divider, Drawer, InputNumber, Space } from 'antd'
const CreateExams = () => {
  const [open, setOpen] = useState(false)
  const [checkState, setCheckState] = useState(false)
  const showDrawer = () => {
    setOpen(true)
    setCheckState(!checkState)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onChange = (value: number | null) => {
    console.log('changed', value)
  }
  const [inputFields, setInputFields] = useState([{ value: '' }])
  const handleInputChange = (index: any, event: any) => {
    const values = [...inputFields]
    values[index].value = event.target.value
    setInputFields(values)
  }
  const handleAddFields = () => {
    setInputFields([...inputFields, { value: '' }])
  }
  const handleRemoveFields = (index: any) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }
  return (
    <>
      <Divider orientation='left'>Create Exams</Divider>
      <Drawer
        title='Details Questions'
        placement={'right'}
        width={900}
        className='absolute z-10000000'
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button styleClass='py-2' onClick={onClose}>
              Cancel
            </Button>
          </Space>
        }
      >
        <div className='bg-[#D9D9D9] w-full rounded-md h-screen relative'>
          <h3 className='text-center pt-4 text-xl text-black underline'>Details Questions</h3>
          {inputFields.map((inputField, index) => (
            <div
              key={index}
              className='bg-white w-11/12 h-[60px] mx-auto rounded-md border mt-5 flex justify-between items-center'
            >
              <div className='mx-5 flex items-center gap-3'>
                <p className='text-xl text-black'>Points</p>
                <input
                  className='rounded-md'
                  placeholder='points'
                  type='text'
                  value={inputField.value}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div>
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-3'>
                  <p className='text-xl text-black'>Count</p>
                  <input
                    className='rounded-md'
                    placeholder='Count'
                    type='text'
                    value={inputField.value}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <div className='mx-5'>
                  {index !== 0 && (
                    <img
                      className='w-[30px] hover:scale-110 cursor-pointer'
                      src={closeIcons}
                      alt='close'
                      onClick={() => handleRemoveFields(index)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className='w-fit h-fit mx-auto rounded-md mt-5'>
            <img
              className='w-[40px] hover:scale-110 cursor-pointer'
              src={addIcons}
              alt='add'
              onClick={handleAddFields}
            />
          </div>
        </div>
        <div className='absolute bottom-10 mx-auto flex justify-center items-center w-full'>
          <Button styleClass='py-2 w-2/3 bg-[#24A19C]'>Xác Nhận</Button>
        </div>
      </Drawer>
      <div className='flex justify-between w-full gap-10'>
        <div className='w-1/2 border border-[#24A19C] rounded-md min-h-screen relative shadow-lg'>
          <div className='flex justify-between items-center bg-[#24A19C] py-1'>
            <h4 className='text-xl font-bold text-white pl-2'>Exams Question</h4>
            <div className='w-[40px] h-[40px] mr-2 rounded-md shadow-xl bg-[#cae0e0] flex justify-center items-center text-white font-bold'>
              0
            </div>
          </div>
          <div className='mt-5 mx-2'>
            <div className='w-full  h-[60px] border rounded-md flex justify-between items-center shadow-lg bg-white bg-opacity-25'>
              <div className='mx-2'>
                <h2>Categories A</h2>
              </div>
              <div className='mx-2'>
                <img className='w-[30px] hover:scale-110 cursor-pointer' src={closeIcons} alt='close' />
              </div>
            </div>
          </div>

          <div className='mt-5 mx-2'>
            <div className='w-full  h-[60px] border rounded-md flex justify-between items-center shadow-lg bg-white bg-opacity-25'>
              <div className='mx-2'>
                <h2>Categories B</h2>
              </div>
              <div className='mx-2'>
                <img className='w-[30px] hover:scale-110 cursor-pointer' src={closeIcons} alt='close' />
              </div>
            </div>
          </div>

          <div className='mt-5 mx-2'>
            <div className='w-full  h-[60px] border rounded-md flex justify-between items-center shadow-lg bg-white bg-opacity-25'>
              <div className='mx-2'>
                <h2>Categories C</h2>
              </div>
              <div className='mx-2'>
                <img className='w-[30px] hover:scale-110 cursor-pointer' src={closeIcons} alt='close' />
              </div>
            </div>
          </div>

          <div className='absolute bottom-3 mx-auto flex justify-center items-center w-full'>
            <Button styleClass='py-2 w-2/3'>Tạo Đề Thi</Button>
          </div>
        </div>
        {/*  */}
        <div className='w-1/2 border border-boxdark rounded-md'>
          <div className='flex justify-between items-center bg-[#5800FF] py-1'>
            <h4 className='text-xl font-bold text-white pl-2'>Categories Question</h4>
            <div className='w-[40px] h-[40px] rounded-md shadow-xl bg-[#bcb0d2] mr-2 flex justify-center items-center text-white font-bold'>
              0
            </div>
          </div>
          {/*  */}

          <div className='mt-5 mx-2'>
            <div className='w-full  h-[60px] border rounded-md flex justify-between items-center shadow-lg bg-white bg-opacity-25'>
              <div className='mx-2'>
                <h2>Categories A</h2>
              </div>
              <div className='mx-2'>
                <img
                  onClick={showDrawer}
                  className='w-[30px] hover:scale-110 cursor-pointer'
                  src={`${checkState ? checkIcons : unCheckIcons}`}
                  alt='close'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateExams
