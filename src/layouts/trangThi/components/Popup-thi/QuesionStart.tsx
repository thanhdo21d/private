import { Footer, Header } from 'antd/es/layout/layout'
import React, { useEffect, useRef, useState } from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'
import Confetti from 'react-confetti'
import Pagination from '~/pages/roles/Pagination'
import { AiOutlineEnter } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
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
          {showPop ? (
            <PopupSuccess />
          ) : (
            <div>
              <div className='text-danger'>
                RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis sint quo eum tempore
                veritatis iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente eligendi quia? Dolore
                nisi cum sit nihil. RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis sint
                quo eum tempore veritatis iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente eligendi
                quia? Dolore nisi cum sit nihil. RandumQuesion Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quis sint quo eum tempore veritatis iusto minima quas laboriosam temporibus iure! Quam mollitia sapiente
                eligendi quia? Dolore nisi cum sit nihil.
              </div>

              <div className='flex justify-center mx-auto !mt-10'>
                <div className='grid-cols-1 cursor-pointer	mx-auto  gap-5 grid'>
                  <div
                    className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
                  >
                    <span className='font-bold text-xl pl-5 text-black'>A </span> :{' '}
                    <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
                  </div>
                  <div
                    className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
                  >
                    <span className='font-bold text-xl pl-5 text-black'>B </span> :{' '}
                    <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
                  </div>
                  <div
                    className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
                  >
                    <span className='font-bold text-xl pl-5 text-black'>C </span> :{' '}
                    <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
                  </div>
                  <div
                    className='w-[800px] border border-body bg-bodydark rounded-md  flex items-center text-start  
        overflow-h-scroll min-h-[50px] transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2'
                  >
                    <span className='font-bold text-xl pl-5 text-black'>D </span> :{' '}
                    <span className='font-medium text-md'> Lorem ipsum dolor sit amet consectetur</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            height: 140
          }}
          className='absolute bottom-0  flex justify-center'
        >
          <div className='flex absolute top-2 mx-auto justify-center items-center gap-5 '>
            <div className='text-md flex items-center cursor-pointer font-bold text-black'>
              Quay Lại <AiOutlineEnter size={22} />
            </div>
            <div>
              <Button styleClass='cursor-pointer btn-grad w-[200px] h-[50px] !flex items-center gap-2'>
                <span> submit</span>
                <span>
                  <TiTick className='text-success text-xl font-bold' />
                </span>
              </Button>
            </div>
            <div className='text-md flex  items-center font-bold text-black'>hoặc ấn ENTER</div>
          </div>
          <div className='absolute bottom-2 mx-auto flex justify-center'>
            <Pagination pageSize={5} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default QuesionStart
