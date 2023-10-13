import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Button } from '~/components'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { useNavigate } from 'react-router-dom'
import { toastService } from '~/utils/toask/toaskMessage'
import { AppContext } from '~/contexts/app.contexts'
import { Radio } from 'antd'

const AcceptUserDipament = () => {
  const { t } = useTranslation(['header'])
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const handelGoon = () => {
    navigate('/action-bai-thi')
    toastService.success(t('product.happy_user'))
  }
  return (
    <div>
      <div>
        <div className=' mx-auto px-4 w-[1000px] '>
          <div className='relative  min-w-0 break-words h-[400px] bg-white w-full  shadow-xl rounded-lg '>
            <div className='flex flex-wrap pt-3 justify-center'>
              <motion.p
                variants={fadeIn('down', 0.25)}
                initial='hidden'
                whileInView={'show'}
                viewport={{ once: false, amount: 0.7 }}
                className='text-primary text-xl font-bold'
              >
                {t('product.accept_user_helo')}
              </motion.p>
            </div>
            <div className='px-6'>
              <div className='text-sm float-left leading-normal mt-0 mb-2 text-blueGray-400 font-bold '>
                {' '}
                <p className='my-1'> {profile?.email} </p>
              </div>
              <div className='mt-5 py-10 border-t border-blueGray-200 text-center'>
                <div>
                  <Radio.Group defaultValue='a' buttonStyle='solid' style={{ marginTop: 16 }}>
                    <Radio.Button value='a'>Hangzhou</Radio.Button>
                    <Radio.Button value='b'>Shanghai</Radio.Button>
                    <Radio.Button value='c'>Beijing</Radio.Button>
                    <Radio.Button value='d'>Chengdu</Radio.Button>
                    <Radio.Button value='e'>Hangzhou</Radio.Button>
                    <Radio.Button value='f'>Shanghai</Radio.Button>
                    <Radio.Button value='g'>Beijing</Radio.Button>
                    <Radio.Button value='h'>Chengdu</Radio.Button>
                  </Radio.Group>
                </div>
                <div className='w-full absolute  bottom-5 '>
                  <div className=''>
                    <Button
                      styleClass='bg-success flex m-auto  w-[80%] active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={handelGoon}
                    >
                      {t('product.enter_bt')}
                      <PiKeyReturnFill />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcceptUserDipament
