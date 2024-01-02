import { Breadcrumb, Divider, Form, Image, Input, Radio, RadioChangeEvent, Skeleton, Upload } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from '~/components'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
  useGetDetailsExamsQuery,
  useEditExamsQuestion2Mutation,
  useUploadImageQuestionMutation,
  useAddQuestionDataMutation,
  useCreateUploadImageQuestionMutation
} from '~/apis/department/department'
import axios from 'axios'
import { toastService } from '~/utils/toask/toaskMessage'
import addIcons from '~/assets/add (1).png'
interface IChoose {
  q: string
  img: string
}
const EditQuestionExams = () => {
  const [form] = Form.useForm()
  const [dynamicQuestions, setDynamicQuestions] = useState<any>([])
  const navigate = useNavigate()
  const [upload] = useUploadImageQuestionMutation()
  const [Createupload] = useCreateUploadImageQuestionMutation()
  const [editExamQuestion] = useEditExamsQuestion2Mutation()
  const [addExamQuestion] = useAddQuestionDataMutation()
  const [queryParameters] = useSearchParams()
  const idCategory: string | null = queryParameters.get('idCategory')
  const listName = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ]
  const { id } = useParams()
  const isAddQuestion = location.pathname.includes(`add`)
  const [imageQuestion, setImageQuestion] = useState<any>({
    imageQuestion: '',
    imageChooseA: '',
    imageChooseB: '',
    imageChooseC: '',
    imageChooseD: '',
    imageChooseE: '',
    imageChooseF: '',
    imageChooseG: '',
    imageChooseH: '',
    imageChooseI: '',
    imageChooseJ: '',
    imageChooseK: '',
    imageChooseL: '',
    imageChooseM: ''
  })
  console.log(isAddQuestion)
  const {
    data: getDetailsExams,
    isFetching: isDeailFetching,
    isLoading
  } = useGetDetailsExamsQuery({
    idDepartment: id
  })
  const [dataQuestion, setDataQuestion] = useState({
    question: getDetailsExams?.dataDepartments?.question,
    questionA: getDetailsExams?.dataDepartments?.choose[0]?.q,
    questionB: getDetailsExams?.dataDepartments?.choose[1]?.q,
    questionC: getDetailsExams?.dataDepartments?.choose[2]?.q,
    questionD: getDetailsExams?.dataDepartments?.choose[3]?.q,
    questionE: getDetailsExams?.dataDepartments?.choose[4]?.q,
    questionF: getDetailsExams?.dataDepartments?.choose[5]?.q,
    questionG: getDetailsExams?.dataDepartments?.choose[6]?.q,
    questionH: getDetailsExams?.dataDepartments?.choose[7]?.q,
    answer: getDetailsExams?.dataDepartments?.answer,
    point: getDetailsExams?.dataDepartments?.point,
    type: getDetailsExams?.dataDepartments?.type
  })
  console.log(dataQuestion)
  const [file, setFile] = useState<any>(null)
  console.log(file, 'cd')
  const uri = import.meta.env.VITE_API
  const handleSubmit = async (num: string) => {
    console.log(num, 'cd')
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
    } catch (error) {
      console.error(error)
      toastService.error('errror upload')
    }
  }
  useEffect(() => {
    if (id)
      form.setFieldsValue({
        name: getDetailsExams?.dataDepartments?.question,
        point: getDetailsExams?.dataDepartments?.point,
        answer: getDetailsExams?.dataDepartments?.answer,
        ...getDetailsExams?.dataDepartments?.choose?.reduce((acc: any, chooseItem: IChoose, index: number) => {
          console.log(acc)
          acc[`question${index}`] = chooseItem.q
          return acc
        }, {}),
        type: getDetailsExams?.dataDepartments?.type
      })
  }, [getDetailsExams, form, id])
  const createUploadImage = async (num: string) => {
    console.log('num', num)
    const formData = new FormData()
    formData.append('CreateQuestion', file)
    try {
      switch (num) {
        case '1':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              console.log(data)
              setImageQuestion({
                ...imageQuestion,
                imageQuestion: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '2':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseA: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '3':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseB: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '4':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseC: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '5':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseD: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '6':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseE: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '7':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseF: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '8':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseG: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '9':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseH: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '10':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseI: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '11':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseJ: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '12':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseK: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '13':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseL: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
        case '14':
          Createupload(formData)
            .unwrap()
            .then((data) => {
              setImageQuestion({
                ...imageQuestion,
                imageChooseM: data.avatarFileName
              })
              console.log(data.avatarFileName, 'data ne')
              toastService.success('question uploaded successfully')
            })
            .catch(() => toastService.error('error uploading'))
          break
      }
    } catch (error) {
      console.error(error)
      toastService.error('errror upload')
    }
  }
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
  const handelAddQuestion = () => {
    const filteredChoices = [
      { q: dataQuestion.questionA, img: imageQuestion.imageChooseA },
      { q: dataQuestion.questionB, img: imageQuestion.imageChooseB },
      { q: dataQuestion.questionC, img: imageQuestion.imageChooseC },
      { q: dataQuestion.questionD, img: imageQuestion.imageChooseD },
      { q: dataQuestion.questionE, img: imageQuestion.imageChooseE },
      { q: dataQuestion.questionF, img: imageQuestion.imageChooseF },
      { q: dataQuestion.questionG, img: imageQuestion.imageChooseG },
      { q: dataQuestion.questionH, img: imageQuestion.imageChooseH }
    ].filter((choice) => choice.q !== undefined)
    addExamQuestion({
      question: dataQuestion.question,
      image: imageQuestion.imageQuestion,
      point: dataQuestion.point,
      choose: filteredChoices,
      answer: dataQuestion.answer,
      idCategory: idCategory,
      type: String(dataQuestion.type)
    })
      .unwrap()
      .then(() => {
        toastService.success('Create successfully')
      })
      .catch((error) => toastService.error(error))
  }
  const handleAddQuestion = () => {
    setDynamicQuestions((prevQuestions: any) => [...prevQuestions, { img: '', question: '' }])
  }
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value)
    setDataQuestion({
      ...dataQuestion,
      type: e.target.value
    })
  }

  console.log(dataQuestion?.type)
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
                {!isAddQuestion && getDetailsExams?.dataDepartments?.image.length > 0 ? (
                  <img className='w-[250px]' src={`${uri}${getDetailsExams?.dataDepartments?.image[0]}`} />
                ) : (
                  <div>
                    {imageQuestion.imageQuestion !== '' && (
                      <img className='w-[200px]' src={`${uri}${imageQuestion.imageQuestion}`} />
                    )}
                  </div>
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
                      !isAddQuestion ? handleSubmit('1') : createUploadImage('1')
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
            {isAddQuestion && (
              <div className='flex justify-center'>
                <img
                  onClick={handleAddQuestion}
                  className='w-[50px] cursor-pointer hover:scale-110 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none'
                  src={addIcons}
                />
              </div>
            )}
            {dynamicQuestions.map((question: any, index: number) => {
              // const imageName = listName[index + 1]
              const imageName = `imageChoose${String.fromCharCode(65 + index)}`
              const imageSrc = `${uri}${imageQuestion[imageName]}`
              console.log(imageSrc)
              return (
                <div key={index}>
                  <div className='grid grid-cols-2 gap-15 items-center'>
                    <Form.Item
                      name={`question${index}`}
                      label={<p className='font-bold text-xl'>Đáp án {listName[index]} </p>}
                      rules={[{ required: true, message: 'Vui lòng nhập Thêm Câu Hỏi ...!' }]}
                    >
                      <TextArea
                        onChange={(event) =>
                          setDataQuestion({
                            ...dataQuestion,
                            [`question${listName[index]}`]: event.target.value
                          })
                        }
                        className='rounded-md border border-[#ccc] '
                        placeholder='Vui lòng nhập Thêm Câu Hỏi ...!'
                      />
                    </Form.Item>
                    <div className='flex items-center w-full'>
                      <div className='w-1/2'>
                        {imageQuestion ? <Image className='!w-[200px]' src={`${imageSrc}`} /> : <div></div>}
                      </div>
                      <div className='block w-1/2'>
                        <form className=''>
                          <label
                            htmlFor={`fileInput${index}`}
                            className='flex items-center w-1/3 justify-center py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                          >
                            <input
                              type='file'
                              id={`fileInput${index}`}
                              className='w-full'
                              onChange={(e: any) => setFile(e.target.files[0])}
                              style={{ display: 'none' }}
                            />
                            Select Image
                          </label>
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              createUploadImage(String(index + 2))
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
                </div>
              )
            })}
            {getDetailsExams?.dataDepartments?.choose?.map((data: IChoose, index: number) => {
              return (
                <div>
                  <div className='grid grid-cols-2 gap-15 items-center'>
                    <Form.Item
                      name={`question${index}`}
                      label={<p className='font-bold text-xl'>Đáp án {listName[index]} </p>}
                      rules={[{ required: true, message: 'vui lòng nhập đáp án ...!' }]}
                    >
                      <TextArea
                        onChange={(event) =>
                          setDataQuestion({
                            ...dataQuestion,
                            questionA: event.target.value
                          })
                        }
                        className='rounded-md border border-[#ccc] '
                        placeholder='vui lòng nhập đáp án ...!'
                      />
                    </Form.Item>
                    <div className='flex items-center w-full'>
                      <div className='w-1/2'>
                        {!isAddQuestion && getDetailsExams?.dataDepartments?.choose[index]?.img !== '' ? (
                          <Image
                            className='!w-[200px]'
                            src={`${uri}${getDetailsExams?.dataDepartments?.choose[index]?.img}`}
                          />
                        ) : (
                          <div>
                            {imageQuestion.imageChooseA !== '' && (
                              <Image className='!w-[200px]' src={`${uri}${imageQuestion.imageChooseA}`} />
                            )}
                          </div>
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
                              !isAddQuestion ? handleSubmit(String(index + 2)) : createUploadImage(String(index + 2))
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
                </div>
              )
            })}
            <Divider></Divider>
            <div className='grid grid-cols-2 gap-10'>
              <Form.Item
                name='answer'
                label={<p className='font-bold text-xl'>Đáp án Đúng </p>}
                rules={[{ required: true, message: 'vui lòng nhập Thêm Câu Hỏi ...!' }]}
              >
                <Input.TextArea
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
            {!isAddQuestion ? (
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
            ) : (
              <button
                onClick={(e: any) => {
                  e.preventDefault()
                  handelAddQuestion()
                }}
                type='submit'
                className='mt-15  w-full cursor-pointer bg-body py-3 rounded-md shadow-lg  text-white font-medium'
              >
                Create Question
              </button>
            )}
          </Form>
        </div>
      )}
    </div>
  )
}

export default EditQuestionExams
