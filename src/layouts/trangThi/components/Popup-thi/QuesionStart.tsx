import { Footer, Header } from 'antd/es/layout/layout'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import cancel from '../../../../assets/close.png'
import { toastService } from '~/utils/toask/toaskMessage'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'
import Confetti from 'react-confetti'
import Pagination from '~/pages/roles/Pagination'
import { AiOutlineEnter } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import turnLeft from '../../../../assets/turn-left.png'
import turnright from '../../../../assets/turn-right.png'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Checkbox, Divider, Form, Image, Input, Skeleton } from 'antd'
import { container, formats } from '~/utils/quill'
import Spreadsheet from 'react-spreadsheet'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import { useSessionExamsQuestionQuery, useSubmitExamsQuestionMutation } from '~/apis/topicQuestion/topicQuestion'
import { AppContext } from '~/contexts/app.contexts'
import { Loader } from '~/common'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { decrementCount, incrementCount, setExamsData, updateSubmitData } from '~/store/slice/exams.slice'
import axios from 'axios'
import PopError from './PopError'
import Popconfirm from './Popconfirm'
import TextArea from 'antd/es/input/TextArea'
const QuesionStart = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const [Question, setQuestion] = useState<any[]>([])
  const [editorContent, setEditorContent] = useState('')
  const listName = ['A', 'B', 'C', 'D']
  const { submitData: checkDataSubmit } = useAppSelector((state) => state.examAction)
  //
  const [SubmitData, setSubmitData] = useState<any[]>([])
  function updateChoose(counts: number, chooses: string) {
    let newData = SubmitData
    if (SubmitData[counts] == undefined) newData = { ...SubmitData, ...{ [counts]: [chooses] } }
    else if (!SubmitData[counts].includes(chooses)) {
      newData[counts].push(chooses)
    } else if (SubmitData[counts].includes(chooses)) {
      let arr = SubmitData[counts]
      arr = arr.filter((item: any) => item != chooses)
      newData[counts] = arr
    }
    setSubmitData(newData)
  }
  const [answers, setAnswers] = useState<any>({})
  const { profile } = useContext(AppContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [height, setHeight] = useState<any>(null)
  const [queryParameters] = useSearchParams()
  const idSession: string | null = queryParameters.get('idSession')
  const [actionSubmit] = useSubmitExamsQuestionMutation()
  const [width, setWidth] = useState<any>(null)
  const confetiRef: any = useRef(null)
  const { t } = useTranslation(['header'])
  const dispatch = useAppDispatch()
  const { count: countAction } = useAppSelector((state) => state.examAction)
  const { examsData } = useAppSelector((state) => state.examAction)
  const { count } = useAppSelector((state) => state.examAction)
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useSessionExamsQuestionQuery({
    id: idSession as string
  })
  useEffect(() => {
    if (dataIdExmasDetails) {
      dispatch(setExamsData(dataIdExmasDetails?.questions[countAction]))
    }
  }, [dispatch, idSession, dataIdExmasDetails?.questions, dataIdExmasDetails, countAction])
  useEffect(() => {
    setHeight((confetiRef.current = '2000px'))
    setWidth((confetiRef.current = '1200px'))
  }, [])
  const uri = import.meta.env.VITE_API
  const reactQuillRef = useRef<ReactQuill>(null)
  const handelSubmit = () => {
    const confirm = window.confirm('Bạn Đã Chắc Muốn Nộp Bài ?')
    if (confirm) {
      actionSubmit({
        id: idSession as string,
        data: checkDataSubmit,
        mailUser: profile?.email as string,
        nameExams: ''
      })
        .unwrap()
        .then((data) => {
          setQuestion(data)
          setShowPop(true)
        })
        .catch((error) => console.error(error))
      setTimeout(() => {
        // navigate('/')
      }, 10000)
    }
  }
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // alert(
        //   'nhân viên đã thoát toàn màn hình! , Lưu ý việc thoát màn hình admin sẽ nhận được số lượt thoát của bạn , việc này có thể ảnh hưởng đến kết quả thi của bạn '
        // )
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
  const incrementCountData = () => {
    dispatch(incrementCount())
  }
  const decrementCountData = () => {
    dispatch(decrementCount())
  }
  useEffect(() => {
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          dispatch(decrementCount())
          break
        case 39:
          dispatch(incrementCount())
          break
      }
    }
  }, [dispatch])
  const onFinish = (values: any) => {
    console.log(editorContent)
  }
  const handleEditorChange = (event) => {
    const newContent = event.target.value
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [countAction]: newContent
    }))
  }
  console.log(answers)
  useEffect(() => {
    if (examsData?.choose?.every((data) => data.img === '' && data.q === '')) {
      setEditorContent(answers[countAction] || '')
    }
  }, [countAction, answers, examsData])
  useEffect(() => {
    setEditorContent(answers[countAction] || '')
  }, [countAction, answers])
  if (isLoadingDetails || isFetchingDetails)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )

  console.log(answers[count], '1')

  return (
    <div className=' mx-auto px-4'>
      <div>{dataIdExmasDetails?.statusError === '1' && <PopError />}</div>
      <div className=' min-w-0 h-[750px] 2xl:h-[800px] overflow-y-scroll break-words   bg-white  shadow-xl rounded-lg relative'>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className='flex w-[100%] items-center  justify-between '>
            <div>
              <p className='text-xl  py-2 pl-5 font-bold text-white text-center items-center'>
                {t('product.total_time')} : {dataIdExmasDetails?.TimeLeft} (phút)
              </p>
            </div>
            <div>
              <h2 className='text-xl font-bold text-white'>{dataIdExmasDetails?.questions?.name} </h2>
            </div>
            <div className='justify-end flex items-center gap-5'>
              <Button
                styleClass=' w-[120px] 2xl:w-[200px] !px-0 text-xl font-bold h-[45px] bg-[#FF3366] rounded-md shadow-xl hover:bg-warning'
                onClick={handelSubmit}
              >
                {t('product.submit_form')}
              </Button>
            </div>
          </div>
        </Header>
        <div className='px-6 gird mt-10 h-[10000px] grid-cols-5  gap-3 '>
          {showPop ? (
            <PopupSuccess Question={Question} />
          ) : (
            <div>
              <div className=''>
                <Divider orientation='left'>Nội Dung Câu Hỏi </Divider>
                <div>
                  <div className='flex justify-between items-start'>
                    <div className='text-black font-medium'>
                      <p className='text-black font-bold underline text-xl py-2'>Câu {countAction + 1}</p>
                      <p className=''>{examsData?.question}</p>
                    </div>
                    <div>
                      {examsData?.image?.length > 0 ? (
                        <Image className='rounded-md ' src={`${uri}${examsData?.image[0]}`} />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  {examsData?.choose?.every((data: any) => data.img === '' && data.q === '') ? (
                    <div className='mt-15'>
                      <p className='text-xl font-bold text-black mb-2'>Vui Lòng Nhập câu trả lời!</p>
                      {examsData && (
                        <Form
                          name='basic'
                          autoComplete='off'
                          layout='vertical'
                          className='dark:text-white'
                          onFinish={onFinish}
                        >
                          <Form.Item
                            key={`form-item-${countAction}`}
                            className='dark:text-white mb-17'
                            name='description'
                            rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                          >
                            <TextArea
                              className='h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'
                              value={answers[countAction]}
                              onChange={handleEditorChange}
                              placeholder='Vui Lòng Nhập câu trả lời!...........'
                            />
                          </Form.Item>
                          <Button type='submit'> xác nhận </Button>
                        </Form>
                      )}
                    </div>
                  ) : (
                    examsData?.choose?.map((data: any, index: number) => (
                      <div key={index} className={``}>
                        <div
                          onClick={() => {
                            dispatch(
                              updateSubmitData({
                                counts: count + 1,
                                chooses: listName[index]
                              })
                            )
                          }}
                          className={`w-full mt-[20px] border border-body  rounded-md  flex items-center text-start
               overflow-h-scroll min-h-[70px] cursor-pointer transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
               hover:scale-80 hover:bg-indigo-500 duration-300 gap-2 pl-5 ${
                 checkDataSubmit[count + 1]?.includes(listName[index]) && checkDataSubmit[count + 1] != undefined
                   ? 'bg-warning'
                   : ''
               }`}
                        >
                          <span className='font-bold text-xl pl-5 text-black'>{listName[index]}</span>:{' '}
                          <span className='font-medium text-md text-black'> {data?.q}</span>
                        </div>
                        <div className='mt-5'>
                          {data?.img ? <Image className='!w-[205px] rounded-md' src={`${uri}${data?.img}`} /> : ''}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          {showPop ? (
            <>
              <div className='confettie-wrap absolute inset-0' ref={confetiRef}>
                <Confetti numberOfPieces={150} width={width} height={height} />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <Footer
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            alignItems: 'center',
            background: '#ccc',
            height: 140
          }}
          className='absolute bottom-0  flex justify-center'
        >
          <div className='flex absolute  mx-auto justify-center items-center gap-5 '>
            <div
              className='flex gap-4 shadow-xl bg-white cursor-pointer border border-[#ccc] ease-linear rounded-md px-6 py-1 items-center overflow-hidden'
              style={{
                transition: 'background 0.3s easy'
              }}
              onClick={decrementCountData}
            >
              <img className='w-[50px] hover:scale-110' src={turnLeft} alt='left' />
              <span className='font-bold text-black text-xl'> prev</span>
            </div>
            <div
              className='flex gap-4 cursor-pointer bg-white shadow-xl border border-[#ccc] rounded-md px-6 py-1 items-center'
              onClick={incrementCountData}
            >
              <span className='font-bold text-black text-xl'>next</span>
              <img className='w-[50px] hover:scale-110 drop-shadow-2' src={turnright} alt='left' />
            </div>
          </div>
        </Footer>
        di
      </div>
    </div>
  )
}

export default QuesionStart
