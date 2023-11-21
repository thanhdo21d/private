import React, { useState } from 'react'
import closeIcons from '../../../assets/close.png'
import addIcons from '../../../assets/plus.png'
import checkIcons from '../../../assets/check.png'
import unCheckIcons from '../../../assets/unchecked.png'

import { Button } from '~/components'
import { DatePicker, Divider, Drawer, Empty, Input, InputNumber, Space } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
const CreateExams = () => {
  const [open, setOpen] = useState(false)
  const [checkState, setCheckState] = useState(false)
  const [addQuestion, setAddQuestion] = useState(false)
  const [checkHistory, setCheckHistory] = useState(false)
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
  const [inputFields, setInputFields] = useState<any>([{ x: '', y: '' }])
  const handleInputChange = (index: any, event: any) => {
    const { name, value } = event.target
    const values = [...inputFields]
    values[index][name] = value
    setInputFields(values)
  }
  const handleAddFields = () => {
    setInputFields([...inputFields, { x: '', y: '' }])
  }
  const handleRemoveFields = (index: any) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
  }
  return (
    <>
      <Divider orientation='left'>Create Exams</Divider>
      <div>
        <div className='flex gap-10 items-center justify-between'>
          <div className='flex gap-10 items-center'>
            <div>
              <p>Kì Thi</p>
              <Input
                className='h-[32px] border mt-2 border-[#d9d9d9]  w-[400px] rounded-md'
                size='large'
                placeholder='large size'
              />
            </div>
            <div>
              <p> Hiệu lực trong</p>
              <DatePicker.RangePicker className='mt-2' onChange={onDateChange} />
            </div>
            <div>
              <p>Thời Gian </p>
              <InputNumber className='h-[32px] mt-2 rounded-md' size='large' />
            </div>
          </div>
          <div>
            <p className='text-center'>Sử Dụng Cấu Trúc Gần Nhất </p>
            <Button
              onClick={() => {
                showDrawer()
                return setCheckHistory(true)
              }}
              styleClass='h-[32px] mt-2 rounded-md'
            >
              Xem Cấu Trúc Đã Tạo
            </Button>
          </div>
        </div>
        <div className='mt-10'>
          <p>Tên Bài Thi</p>
          <Input
            className='h-[32px] border mt-2 border-[#d9d9d9]  w-full rounded-md'
            size='large'
            placeholder='large size'
          />
        </div>
        <div className='border-b border-[#d9d9d9] mb-5'>
          <Divider orientation='left' plain>
            <p> Câu Hỏi</p>
          </Divider>
          <div className='flex justify-center'>
            <Empty
              imageStyle={{ height: 60 }}
              description={
                <span>
                  Thêm <a>Câu Hỏi</a>
                </span>
              }
            >
              <div className='w-fit h-fit mx-auto rounded-md mt-5 mb-5'>
                <img
                  className='w-[40px] hover:scale-110 cursor-pointer'
                  src={addIcons}
                  alt='add'
                  onClick={() => setAddQuestion(!addQuestion)}
                />
              </div>
            </Empty>
          </div>
        </div>
      </div>

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
        {checkHistory ? (
          <div> </div>
        ) : (
          <div>
            <div className='bg-[#D9D9D9] w-full rounded-md h-screen relative'>
              <h3 className='text-center pt-4 text-xl text-black underline'>Details Questions</h3>
              {inputFields.map((inputField: any, index: any) => {
                console.log(inputField)
                console.log(inputFields)
                return (
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
                        name='x'
                        value={inputField.x}
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
                          name='y'
                          value={inputField.y}
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
                )
              })}
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
          </div>
        )}
      </Drawer>

      {addQuestion && (
        <div className='flex justify-between w-full mt-15 gap-10'>
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
              <Button styleClass='py-2 w-2/3'>Xác Nhận</Button>
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
                    onClick={() => {
                      showDrawer()
                      setCheckHistory(false)
                    }}
                    className='w-[30px] hover:scale-110 cursor-pointer'
                    src={`${checkState ? checkIcons : unCheckIcons}`}
                    alt='close'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className=' mx-auto flex mt-15 justify-center items-center w-full'>
        <Button styleClass='py-2 w-2/3 bg-[#24A19C]'>Thêm Đề Thi</Button>
      </div>
    </>
  )
}

export default CreateExams
