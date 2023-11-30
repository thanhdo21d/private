import { Footer, Header } from 'antd/es/layout/layout'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
import PopupSuccess from './PopupSuccess.tsx/PopupSuccess'
import Confetti from 'react-confetti'
import Pagination from '~/pages/roles/Pagination'
import { AiOutlineEnter } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Checkbox, Divider, Form, Skeleton } from 'antd'
import { container, formats } from '~/utils/quill'
import Spreadsheet from 'react-spreadsheet'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'
import { useSessionExamsQuestionQuery } from '~/apis/topicQuestion/topicQuestion'
import { AppContext } from '~/contexts/app.contexts'
import { Loader } from '~/common'
const QuesionStart = () => {
  const [showPop, setShowPop] = useState<boolean>(false)
  const [Question, setQuestion] = useState<boolean>(false)
  const { profile } = useContext(AppContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const [height, setHeight] = useState<any>(null)
  const [queryParameters] = useSearchParams()
  const dataPageQuery: string | null = queryParameters.get('page')
  const datalimitQueryChange: string | null = queryParameters.get('limit')
  const [width, setWidth] = useState<any>(null)
  const confetiRef: any = useRef(null)
  const { t } = useTranslation(['header'])
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useSessionExamsQuestionQuery({
    id: profile?._id as string,
    page: dataPageQuery as string,
    limit: datalimitQueryChange as string
  })
  console.log(dataIdExmasDetails, 'ppp')
  useEffect(() => {
    setHeight((confetiRef.current = '2000px'))
    setWidth((confetiRef.current = '1200px'))
  }, [])
  const reactQuillRef = useRef<ReactQuill>(null)
  const queryConfig = useQueryConfig()
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
  const handleProcedureContentChange = (content: string) => {
    console.log(content)
  }
  useEffect(() => {
    const handleVisibilityChange = () => {
      // if (document.hidden) {
      //   alert('Học sinh đã thoát toàn màn hình!')
      // }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
  const canvasRef = useRef<any>(null)
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
  return (
    <div className=' mx-auto px-4'>
      <div className=' min-w-0 h-[800px] overflow-y-scroll break-words   bg-white  shadow-xl rounded-lg relative'>
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
                {t('product.total_time')} : <Countdown date={Date.now() + 10000000} />
              </p>
            </div>
            <div>
              <h2 className='text-xl font-bold text-white'>{dataIdExmasDetails?.questions?.name} </h2>
            </div>
            <div className='justify-end'>
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
            <PopupSuccess />
          ) : (
            <div>
              <div className='text-danger'>
                <Divider orientation='left'>Nội Dung Câu Hỏi</Divider>
                {dataIdExmasDetails?.questions?.map((items: any, index: number) => {
                  return (
                    <div key={items?._id}>
                      <div className=''>
                        <p className='text-black font-bold underline text-xl py-2'>Câu 1</p>
                        <p>{items.question}</p>
                      </div>
                      {items?.choose?.map((data: any) => (
                        <div
                          className='w-full mt-[20px] border border-body bg-bodydark rounded-md  flex items-center text-start
        overflow-h-scroll min-h-[60px] cursor-pointer transition-all	hover:bg-warning ease-in-out delay-150 bg-blue-500 hover:-translate-y-1
         hover:scale-80 hover:bg-indigo-500 duration-300 gap-2 pl-5'
                        >
                          <Checkbox />
                          <span className='font-bold text-xl pl-5 text-black'>A </span> :
                          <span className='font-medium text-md'> {data?.q}</span>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
              {/* {Question ? (
                <div className='flex justify-center mx-auto !mt-10'>
                  <div className='grid-cols-1 cursor-pointer	mx-auto  gap-5 grid'></div>
                </div>
              ) : (
                <div className='mt-15'>
                  <p className='text-xl font-bold text-black mb-2'>Vui Lòng Nhập câu trả lời!</p>
                  <Form.Item
                    className='dark:text-white mb-17'
                    name='description'
                    rules={[{ required: true, message: 'Không được bỏ trống!' }]}
                  >
                    <ReactQuill
                      className='h-[300px]  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'
                      ref={reactQuillRef}
                      theme='snow'
                      placeholder='Vui Lòng Nhập câu trả lời!...........'
                      modules={{
                        toolbar: {
                          container: container
                        },
                        clipboard: {
                          matchVisual: false
                        }
                      }}
                      formats={formats}
                      value={''}
                      onChange={handleProcedureContentChange}
                    />
                  </Form.Item>
                </div>
              )} */}
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
            height: 140
          }}
          className='absolute bottom-0  flex justify-center'
        >
          <div className='flex absolute top-2 mx-auto justify-center items-center gap-5 '>
            <div className='text-md flex items-center cursor-pointer font-bold text-black'>
              Quay Lại <AiOutlineEnter size={22} />
            </div>
            <div>
              <Button
                onClick={() => setQuestion(!Question)}
                styleClass='cursor-pointer btn-grad w-[200px] h-[40px] !flex items-center gap-2'
              >
                <span> submit</span>
                <span>
                  <TiTick className='text-success text-xl font-bold' />
                </span>
              </Button>
            </div>
            <div className='text-md flex  items-center font-bold text-black'>hoặc ấn ENTER</div>
          </div>
          <div className='absolute bottom-2 mx-auto flex justify-center'>
            <Pagination queryConfig={queryConfig} pageSize={10} />
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default QuesionStart
