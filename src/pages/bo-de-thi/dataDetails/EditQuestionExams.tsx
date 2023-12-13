import { Breadcrumb, Divider, Form, Input, Skeleton, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetDetailsExamsQuery,
  useEditExamsQuestion2Mutation,
  useUploadImageQuestionMutation
} from '~/apis/department/department'
import axios from 'axios'
import { toastService } from '~/utils/toask/toaskMessage'

const EditQuestionExams = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [upload] = useUploadImageQuestionMutation()
  const [editExamQuestion] = useEditExamsQuestion2Mutation()

  const { id } = useParams()
  const {
    data: getDetailsExams,
    isFetching: isDeailFetching,
    isLoading
  } = useGetDetailsExamsQuery({
    idDepartment: id
  })
  console.log(getDetailsExams)
  const [dataQuestion, setDataQuestion] = useState({
    question: getDetailsExams?.dataDepartments?.question,
    questionA: getDetailsExams?.dataDepartments?.choose[0]?.q,
    questionB: getDetailsExams?.dataDepartments?.choose[1]?.q,
    questionC: getDetailsExams?.dataDepartments?.choose[2]?.q,
    questionD: getDetailsExams?.dataDepartments?.choose[3]?.q,
    answer: getDetailsExams?.dataDepartments?.answer,
    point: getDetailsExams?.dataDepartments?.point
  })
  const [file, setFile] = useState<any>(null)
  console.log(file, 'cd')
  const uri = import.meta.env.VITE_API
  const handleSubmit = async (num: string) => {
    const formData = new FormData()
    formData.append('question', file)
    formData.append('questionId', id as string)
    formData.append('num', num)
    try {
      upload(formData)
        .unwrap()
        .then(() => {
          toastService.success('question uploaded successfully')
        })
        .catch(() => toastService.error('error uploading'))
      toastService.success('Avatar uploaded successfully')
    } catch (error) {
      console.error(error)
      toastService.error('errror upload')
    }
  }
  useEffect(() => {
    form.setFieldsValue({
      name: getDetailsExams?.dataDepartments?.question,
      point: getDetailsExams?.dataDepartments?.point,
      answer: getDetailsExams?.dataDepartments?.answer,
      questionA: getDetailsExams?.dataDepartments?.choose[0]?.q,
      questionB: getDetailsExams?.dataDepartments?.choose[1]?.q,
      questionC: getDetailsExams?.dataDepartments?.choose[2]?.q,
      questionD: getDetailsExams?.dataDepartments?.choose[3]?.q
    })
  }, [getDetailsExams, form])
  const handelEditQuestion = () => {
    editExamQuestion({
      id: id,
      body: dataQuestion
    })
      .unwrap()
      .then(() => {
        toastService.success('update successfully')
      })
      .catch((error) => toastService.error(error))
  }
  return (
    <div className='m-10'>
      <Breadcrumb
        items={[
          {
            title: 'Trang Quản Trị'
          },
          {
            title: 'Chỉnh Sửa Câu Hỏi'
          }
        ]}
      />
      <div className=' mt-15 justify-center items-center w-1/6'>
        <Button onClick={() => navigate(-1)} styleClass='py-2 w-full 2xl:w-2/3 bg-[#24A19C]'>
          Quay Lại
        </Button>
      </div>
      {isLoading || isDeailFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className='mt-10'>
          <Form form={form} layout='vertical'>
            <Divider orientation='left'>Chi Tiết Câu Hỏi</Divider>
            <Form.Item
              name='name'
              label={<p className='font-bold text-xl'>Câu Hỏi</p>}
              rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
            >
              <TextArea
                onChange={(event) =>
                  setDataQuestion({
                    ...dataQuestion,
                    question: event.target.value
                  })
                }
                className='rounded-md border border-[#ccc] '
                placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
              />
            </Form.Item>
            <Divider></Divider>
            <div className='flex items-center w-full'>
              <div className='w-1/2'>
                {getDetailsExams?.dataDepartments?.image.length > 0 ? (
                  <img className='w-[250px]' src={`${uri}${getDetailsExams?.dataDepartments?.image[0]}`} />
                ) : (
                  ''
                )}
              </div>
              <div className='block w-full'>
                <form className=''>
                  <label
                    htmlFor='fileInput'
                    className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                  >
                    <input
                      type='file'
                      id='fileInput'
                      className='w-full'
                      onChange={(e: any) => setFile(e.target.files[0])}
                      style={{ display: 'none' }}
                    />
                    Select Image
                  </label>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleSubmit('1')
                    }}
                    type='submit'
                    className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
                  >
                    Upload
                  </button>
                </form>
              </div>
            </div>
            <Divider orientation='left'>Chi Tiết đáp án</Divider>
            <div className='grid grid-cols-2 gap-15 items-center'>
              <Form.Item
                name='questionA'
                label={<p className='font-bold text-xl'>Đáp án A </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      questionA: event.target.value
                    })
                  }
                  className='rounded-md border border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <div className='flex items-center w-full'>
                <div className='w-1/2'>
                  {getDetailsExams?.dataDepartments?.choose[0]?.img !== '' ? (
                    <img className='w-[200px]' src={`${uri}${getDetailsExams?.dataDepartments?.choose[0]?.img}`} />
                  ) : (
                    ''
                  )}
                </div>
                <div className='block w-1/2'>
                  <form className=''>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        className='w-full'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit('2')
                      }}
                      type='submit'
                      className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-15 items-center'>
              <Form.Item
                name='questionB'
                label={<p className='font-bold text-xl'>Đáp án B </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      questionB: event.target.value
                    })
                  }
                  className='rounded-md border border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <div className='flex items-center w-full'>
                <div className='w-1/2'>
                  {getDetailsExams?.dataDepartments?.choose[1]?.img !== '' ? (
                    <img className='w-[200px]' src={`${uri}${getDetailsExams?.dataDepartments?.choose[1]?.img}`} />
                  ) : (
                    ''
                  )}
                </div>
                <div className='block w-1/2'>
                  <form className=''>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        className='w-full'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit('3')
                      }}
                      type='submit'
                      className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <Divider></Divider>

            <div className='grid grid-cols-2 gap-15 items-center'>
              <Form.Item
                name='questionC'
                label={<p className='font-bold text-xl'>Đáp án C </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      questionC: event.target.value
                    })
                  }
                  className='rounded-md border border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <div className='flex items-center w-full'>
                <div className='w-1/2'>
                  {getDetailsExams?.dataDepartments?.choose[2]?.img !== '' ? (
                    <img className='w-[200px]' src={`${uri}${getDetailsExams?.dataDepartments?.choose[2]?.img}`} />
                  ) : (
                    ''
                  )}
                </div>
                <div className='block w-1/2'>
                  <form className=''>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        className='w-full'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit('4')
                      }}
                      type='submit'
                      className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <Divider></Divider>

            <div className='grid grid-cols-2 gap-15 items-center'>
              <Form.Item
                name='questionD'
                label={<p className='font-bold text-xl'>Đáp án D </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <TextArea
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      questionD: event.target.value
                    })
                  }
                  className='rounded-md border border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <div className='flex items-center w-full'>
                <div className='w-1/2'>
                  {getDetailsExams?.dataDepartments?.choose[3]?.img !== '' ? (
                    <img className='w-[200px]' src={`${uri}${getDetailsExams?.dataDepartments?.choose[3]?.img}`} />
                  ) : (
                    ''
                  )}
                </div>
                <div className='block w-1/2'>
                  <form className=''>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        className='w-full'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit('5')
                      }}
                      type='submit'
                      className='bg-success  py-2 w-1/3 mt-5 rounded-md text-white font-medium'
                    >
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <Divider></Divider>
            <div className='grid grid-cols-2 gap-10'>
              <Form.Item
                name='answer'
                label={<p className='font-bold text-xl'>Đáp án Đúng </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Input
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      answer: event.target.value
                    })
                  }
                  className='rounded-md border w-full  border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
              <Form.Item
                name='point'
                label={<p className='font-bold text-xl'>Điểm</p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Input
                  onChange={(event) =>
                    setDataQuestion({
                      ...dataQuestion,
                      point: event.target.value
                    })
                  }
                  className='rounded-md border w-full  border-[#ccc] '
                  placeholder='vui lòng nhập Thêm Câu Hỏi ...!'
                />
              </Form.Item>
            </div>
            <button
              onClick={(e: any) => {
                e.preventDefault()
                handelEditQuestion()
              }}
              type='submit'
              className='mt-15  w-full cursor-pointer bg-body py-3 rounded-md shadow-lg  text-white font-medium'
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </div>
  )
}

export default EditQuestionExams
