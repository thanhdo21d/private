import { Skeleton } from 'antd'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Countdown from 'react-countdown'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  useSessionExamsQuestionQuery,
  useSubmitExamsQuestionMutation,
  useUpdateSesionUSerMutation
} from '~/apis/topicQuestion/topicQuestion'
import { AppContext } from '~/contexts/app.contexts'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'

const TesTime2 = () => {
  const idSession = sessionStorage.getItem('idSession2')
  const [actionSubmit] = useSubmitExamsQuestionMutation()
  const [showPop, setShowPop] = useState<boolean>(false)
  const [Question, setQuestion] = useState<any[]>([])
  const [updateSessionUser] = useUpdateSesionUSerMutation()
  const navigate = useNavigate()
  const { profile } = useContext(AppContext)
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useSessionExamsQuestionQuery({
    id: idSession as string
  })
  const dataUserChoose = dataIdExmasDetails?.questions?.map((question) => question.checkUserChoose)
  dataUserChoose?.unshift('')
  const testTime = useMemo(() => {
    if (dataIdExmasDetails?.TimeLeft !== null) {
      return dataIdExmasDetails?.TimeLeft
    }
    return null
  }, [dataIdExmasDetails?.TimeLeft])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = () => {
    if (!isSubmitted) {
      actionSubmit({
        id: idSession as string,
        data: dataUserChoose,
        mailUser: profile?.email as string,
        nameExams: ''
      })
        .unwrap()
        .then((data) => {
          setIsSubmitted(true)
          setQuestion(data)
          setShowPop(true)
          sessionStorage.removeItem('idSession2')
          sessionStorage.removeItem('idSession')
          updateSessionUser({
            id: profile?._id as string,
            idSessionExam: ''
          })
            .unwrap()
            .then(() => console.log('1'))
          setTimeout(() => {
            navigate('/')
          }, 15000)
        })
    }
  }
  const renderer = ({ hours, minutes, seconds, completed }: any) => {
    if (completed) {
      console.log('1')
    } else {
      return (
        <div className='countdown-container'>
          <div className='countdown'>
            <span className='time'>{hours}</span>:<span className='time'>{minutes}</span>:
            <span className='time'>{seconds}</span>
          </div>
        </div>
      )
    }
  }
  useEffect(() => {
    return () => {
      setIsSubmitted(false)
    }
  }, [])
  if (isLoadingDetails || isFetchingDetails)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div className='flex justify-center'>
      <p className='text-xl py-2 pl-5 font-bold text-white text-center items-center'>
        <Countdown date={Date.now() + (testTime as number) * 1000} renderer={renderer} onComplete={handleSubmit} />
      </p>
      {showPop && <PopupSuccess Question={Question} />}
    </div>
  )
}

export default TesTime2
