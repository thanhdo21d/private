import { Menu, Pagination } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import React, { useEffect, useRef, useState } from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
import RandumQuesion from './RandumQuesion'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'
import Confetti from 'react-confetti'
const QuesionStart = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const navigate = useNavigate()
  const [height, setHeight] = useState<any>(null)
  const [width, setWidth] = useState<any>(null)
  const confetiRef: any = useRef(null)
  const { t } = useTranslation(['header'])
  useEffect(() => {
    setHeight((confetiRef.current = '2000px'))
    setWidth((confetiRef.current = '1200px'))
  }, [])
  const handelSubmit = () => {
    const confirm = window.confirm('Bạn Đã Chắc Muốn Nộp Bài ?')
    if (confirm) {
      setShowPop(true)
      toastService.success('Xin chúc mừng, bạn hoàn thành câu hỏi này nhanh thứ mấy trong số những ng tham gia')
      setTimeout(() => {
        navigate('/')
      }, 10000)
    }
  }

  return (
    <div className=' mx-auto px-4  '>
      <div className=' min-w-0 h-[800px] overflow-y-scroll break-words   bg-white  shadow-xl rounded-lg relative'>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center'
            // backgroundColor : "azure"
          }}
        >
          <div className='flex w-[100%]  justify-between '>
            <div>
              <p className='text-xl  py-2 pl-5 font-bold text-white text-center items-center'>
                {t('product.total_time')} : <Countdown date={Date.now() + 10000000} />
              </p>
            </div>
            <div className='justify-end'>
              <Button
                styleClass='w-[200px] text-xl font-bold h-[45px] bg-[#FF3366] rounded-xl shadow-xl hover:bg-warning'
                onClick={handelSubmit}
              >
                {t('product.submit_form')}
              </Button>
            </div>
          </div>
        </Header>

        <div className='px-6 gird mt-10 h-[10000px] grid-cols-5 flex gap-3 '>
          {showPop ? <PopupSuccess /> : <RandumQuesion />}
          {showPop ? (
            <div className='confettie-wrap absolute inset-0' ref={confetiRef}>
              <Confetti numberOfPieces={150} width={width} height={height} />
            </div>
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
            height: 50
          }}
          className='absolute bottom-0  '
        >
          <div className='mx-auto flex justify-center'>
            <Pagination defaultCurrent={1} className='absolute bottom-2 mx-auto' total={50} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default QuesionStart
