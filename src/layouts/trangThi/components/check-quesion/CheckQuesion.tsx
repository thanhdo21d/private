import { Avatar } from 'antd'
import { Footer, Header } from 'antd/es/layout/layout'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSessionExamsQuestionQuery } from '~/apis/topicQuestion/topicQuestion'
import { AppContext } from '~/contexts/app.contexts'
import { useAppDispatch, useAppSelector } from '~/store/root/hook'
import { setCount } from '~/store/slice/exams.slice'
const CheckQuesion = () => {
  const { profile } = useContext(AppContext)
  const [queryParameters] = useSearchParams()
  const idSession: string | null = queryParameters.get('idSession')
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['header'])
  const {
    data: dataIdExmasDetails,
    isLoading: isLoadingDetails,
    isFetching: isFetchingDetails
  } = useSessionExamsQuestionQuery({
    id: idSession as string
  })
  const handelSearchQuestion = (id: number) => {
    dispatch(setCount(id))
  }
  if (isLoadingDetails || isFetchingDetails) return <p>loading.........</p>
  return (
    <div>
      <div>
        <div className=' mx-auto px-4 '>
          <div className='  min-w-0 h-[800px] overflow-y-scroll  break-words  bg-white  shadow-xl rounded-lg relative'>
            <Header
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'darkgreen'
              }}
            >
              <p className='text-sm 2xl:text-xl py-5 font-bold  text-white text-md text-center items-center'>
                {t('product.all_questions')}: {dataIdExmasDetails?.questions?.length}
              </p>
            </Header>
            <div className='border-t-4 w-[300px] mx-auto text-center  border-gray mb-5'></div>
            <div className='px-6 h-[5000px] '>
              <div className='grid grid-cols-3 gap-5 mx-auto'>
                {dataIdExmasDetails?.questions?.map((items: any, index: number) => (
                  <div
                    key={items?._id}
                    onClick={() => handelSearchQuestion(index)}
                    className='flex hover:scale-110 cursor-pointer justify-center items-center'
                  >
                    <Avatar className='bg-black '>{index + 1}</Avatar>
                  </div>
                ))}
              </div>
            </div>
            <Footer
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                alignItems: 'center',
                backgroundColor: 'darkgreen',
                height: 100
              }}
              className='absolute bottom-0  '
            >
              <div className='flex gap-2 w-full'>
                <div className='w-[20px] h-[20px] 2xl:w-[30px] 2xl:h-[30px] rounded-full bg-blue23  text-center items-center'></div>
                <div>
                  <p className='text-white text-sm 2xl:text-md font-medium'>{t('product.check_qes_dl')}</p>
                </div>
              </div>
              <div className='flex gap-2 mt-3'>
                <div className='w-[20px] h-[20px] 2xl:w-[30px] 2xl:h-[30px] rounded-full bg-graydark text-center items-center'></div>
                <div>
                  <p className='text-white text-md font-medium'> {t('product.check_qes_cl')}</p>
                </div>
              </div>
            </Footer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckQuesion
