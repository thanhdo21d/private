import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Button } from '~/components'
const CheckQuesion = () => {
  const { t } = useTranslation(['header'])
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
              <p className='text-xl py-5 font-bold text-white text-md text-center items-center'>
                {t('product.all_questions')}: 40
              </p>
            </Header>
            <div className='border-t-4 w-[300px] mx-auto text-center  border-gray mb-5'></div>
            <div className='px-6 h-[5000px] gird grid-cols-5 flex gap-3 '>
              <div className='w-[40px]  h-[40px] rounded-full bg-blue23 text-center items-center'>
                <span className='font-bold text-xl pt-2'>1</span>
              </div>
              <div className='w-[40px] h-[40px] rounded-full bg-graydark text-center items-center'>
                <span className='font-bold text-xl pt-2'>2</span>
              </div>
            </div>
            {/*  */}
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
              <div className='flex gap-2 '>
                <div className='w-[30px] h-[30px] rounded-full bg-blue23  text-center items-center'></div>
                <div>
                  <p className='text-white text-md font-medium'>{t('product.check_qes_dl')}</p>
                </div>
              </div>
              <div className='flex gap-2 mt-3'>
                <div className='w-[30px] h-[30px] rounded-full bg-graydark text-center items-center'></div>
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
