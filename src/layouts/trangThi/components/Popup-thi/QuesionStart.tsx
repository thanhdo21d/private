import { Footer, Header } from 'antd/es/layout/layout'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import io from 'socket.io-client'
import cancel from '../../../../assets/close.png'
import { toastService } from '~/utils/toask/toaskMessage'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'
import Countdown from 'react-countdown'
import Confetti from 'react-confetti'
import Pagination from '~/pages/roles/Pagination'
import { AiOutlineEnter } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import turnLeft from '../../../../assets/turn-left.png'
import turnright from '../../../../assets/turn-right.png'
import 'react-quill/dist/quill.snow.css'
import { Divider, Image, Input, Skeleton, message } from 'antd'
import {
  useInsertUserChooseMutation,
  useSessionExamsQuestionQuery,
  useSubmitExamsQuestionMutation,
  useUpdateSesionUSerMutation
} from '~/apis/topicQuestion/topicQuestion'
import { AppContext } from '~/contexts/app.contexts'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import {
  decrementCount,
  incrementCount,
  setExamsData,
  setServerData,
  updateSubmitData
} from '~/store/slice/exams.slice'
import PopError from './PopError'
import PopEndTime from './PopEndTime'
const QuesionStart = () => {
  const uri = import.meta.env.VITE_API
  const socket = io(uri, {
    transports: ['websocket', 'pulling', 'flashsocket']
  })
  const [showPop, setShowPop] = useState<boolean>(false)
  const [showStop, setShowStop] = useState<boolean>(false)
  const [showEndTime, setShowEndTime] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [Question, setQuestion] = useState<any[]>([])
  const [insertUserChoose] = useInsertUserChooseMutation()
  const listName = ['A', 'B', 'C', 'D']
  const { submitData: checkDataSubmit } = useAppSelector((state) => state.examAction)
  const [updateSessionUser] = useUpdateSesionUSerMutation()
  const [answers, setAnswers] = useState<any>({})
  const { profile } = useContext(AppContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [height, setHeight] = useState<any>(null)
  const idSession = sessionStorage.getItem('idSession2')
  const idExams = sessionStorage.getItem('idSession')
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
console.log(examsData)
  const dataUserChoose = dataIdExmasDetails?.questions?.map((question) => question.checkUserChoose)
  dataUserChoose?.unshift('')
  useEffect(() => {
    if (dataIdExmasDetails?.status == true) {
      dispatch(setExamsData(dataIdExmasDetails?.questions[countAction]))
    }
  }, [dispatch, idSession, dataIdExmasDetails?.questions, dataIdExmasDetails, countAction])
  useEffect(() => {
    setHeight((confetiRef.current = '2000px'))
    setWidth((confetiRef.current = '1200px'))
  }, [])
  useEffect(() => {
    return () => {
      setIsSubmitted(false)
    }
  }, [])
  const handelSubmit = (num: string) => {
    if (isSubmitted) {
      return false
    }
    if (num == '0') {
      const confirm = window.confirm('Bạn Đã Chắc Muốn Nộp Bài ?')
      if (confirm) {
        setIsSubmitted(true)
        actionSubmit({
          id: idSession as string,
          data: dataUserChoose,
          mailUser: profile?.email as string,
          nameExams: ''
        })
          .unwrap()
          .then((data) => {
            setQuestion(data)
            setShowPop(true)
            updateSessionUser({
              id: profile?._id as string,
              idSessionExam: ''
            })
              .unwrap()
              .then(() => console.log('1'))
          })
          .catch((error) => console.error(error))
        setTimeout(() => {
          // navigate('/')
        }, 10000)
      }
    } else {
      actionSubmit({
        id: idSession as string,
        data: dataUserChoose,
        mailUser: profile?.email as string,
        nameExams: ''
      })
        .unwrap()
        .then((data) => {
          setQuestion(data)
          setShowPop(true)
          updateSessionUser({
            id: profile?._id as string,
            idSessionExam: ''
          })
            .unwrap()
            .then(() => console.log('1'))
        })
        .catch((error) => console.error(error))
      setIsSubmitted(true)
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
  console.log(checkDataSubmit)
  const incrementCountData = useCallback(() => {
    dispatch(incrementCount())
    insertUserChoose({
      id: idSession as string,
      index: countAction,
      userChoose: checkDataSubmit[countAction + 1]
    })
      .unwrap()
      .then(() => {
        console.log('insert success')
      })
      .catch(() => message.error('error'))
  }, [dispatch, idSession, countAction, checkDataSubmit, insertUserChoose])
  useEffect(() => {
    if (dataUserChoose !== undefined) {
      console.log('1')
      dispatch(setServerData(dataUserChoose))
    }
  }, [dispatch, idSession, dataIdExmasDetails?.questions])
  console.log(dataUserChoose, checkDataSubmit, 'day ne')
  const decrementCountData = useCallback(() => {
    dispatch(decrementCount())
    insertUserChoose({
      id: idSession as string,
      index: countAction,
      userChoose: checkDataSubmit[countAction + 1]
    })
      .unwrap()
      .then(() => {
        console.log('insert success')
      })
      .catch(() => message.error('error'))
  }, [dispatch, idSession, countAction, checkDataSubmit, insertUserChoose])
  useEffect(() => {
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          decrementCountData()
          break
        case 39:
          incrementCountData()
          break
      }
    }
  }, [dispatch, answers, countAction, count, decrementCountData, incrementCountData])
  const handleEditorChange = (event: any) => {
    const newContent = event.target.value
    setAnswers({
      ...answers,
      [countAction]: newContent
    })
  }
  useEffect(() => {
    socket.connect()
    socket.on('stopExamsUser', (data) => {
      message.error(`admin ${data?.user} đã dừng bài thi của  bạn`)
      setShowStop(true)
    })
    socket.on('startExamsUser', (data) => {
      message.success(`admin ${data?.user} đã bắt đầu lại bài thi của  bạn`)
      setShowStop(false)
      window.location.reload()
    })
    return () => {
      socket.off('stopExamsUser')
      socket.off('startExamsUser')
      socket.disconnect()
    }
  }, [])

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      setShowEndTime(true)
      handelSubmit('1')
      setIsSubmitted(true)
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      )
    }
  }

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
  if (dataIdExmasDetails?.status == false) {
    return <p className='text-2xl text-white font-bold text-center decoration-primary'>đã hết giờ</p>
  }
  return (
    <div className=' mx-auto px-4'>
      <div>{(dataIdExmasDetails?.statusError === '1' || showStop) && <PopError />}</div>
      <div>
        {showEndTime && <p className='text-2xl text-white font-bold text-center decoration-primary'>đã hết giờ</p>}
      </div>
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
              <p className='text-xl py-2 pl-5 font-bold text-white text-center items-center'>
                {t('product.total_time')} :{' '}
                <Countdown date={Date.now() + (dataIdExmasDetails?.TimeLeft as number) * 1000} renderer={renderer} />
              </p>
            </div>
            <div className='justify-end flex items-center gap-5'>
              <Button
                styleClass=' w-[120px] 2xl:w-[200px] !px-0 text-xl font-bold h-[45px] bg-[#FF3366] rounded-md shadow-xl hover:bg-warning'
                onClick={() => handelSubmit('0')}
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
                        <>
                          <Input.TextArea
                            className='text-black mt-2'
                            onChange={handleEditorChange}
                            rows={4}
                            placeholder='Vui lòng điền đáp án của bạn'
                            value={answers[count] !== undefined ? answers[count] : examsData?.checkUserChoose || ''}
                            id=''
                          />
                          <Button
                            styleClass='mt-10 bg-body'
                            onClick={() =>
                              dispatch(
                                updateSubmitData({
                                  counts: count + 1,
                                  chooses: answers[count]
                                })
                              )
                            }
                            type='submit'
                          >
                            xác nhận
                          </Button>
                        </>
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
        di d
      </div>
    </div>
  )
}

export default QuesionStart

// function updateChoose(counts: number, chooses: string) {
//     let newData = SubmitData
//     if (SubmitData[counts] == undefined) newData = { ...SubmitData, ...{ [counts]: [chooses] } }
//     else if (!SubmitData[counts].includes(chooses)) {
//       newData[counts].push(chooses)
//     } else if (SubmitData[counts].includes(chooses)) {
//       let arr = SubmitData[counts]
//       arr = arr.filter((item: any) => item != chooses)
//       newData[counts] = arr
//     }
//     setSubmitData(newData)
//   }
