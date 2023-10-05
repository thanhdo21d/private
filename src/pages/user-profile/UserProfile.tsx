import { Button } from '~/components'
import { PiKeyReturnFill } from 'react-icons/pi'
import { Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
const UserProfile = () => {
  const navigate = useNavigate()
  return (
    <main className='profile-page'>
      <section className='relative block h-500-px'>
        <div
          className='absolute top-0 w-full h-full bg-center bg-cover'
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'
          }}
        >
          <span id='blackOverlay' className='w-full h-full absolute opacity-50 bg-black' />
        </div>
        <div
          className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px'
          style={{ transform: 'translateZ(0px)' }}
        >
          <svg
            className='absolute bottom-0 overflow-hidden'
            xmlns='http://www.w3.org/2000/svg'
            preserveAspectRatio='none'
            version='1.1'
            viewBox='0 0 2560 100'
            x={0}
            y={0}
          >
            <polygon className='text-blueGray-200 fill-current' points='2560 0 2560 100 0 100' />
          </svg>
        </div>
      </section>
      <section className='relative py-16 bg-blueGray-200'>
        <div className='container mx-auto px-4'>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
            <div className='px-6'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full lg:w-3/12 px-4 lg:order-2 flex justify-center'>
                  <div className='relative'>
                    <img
                      alt='...'
                      src='https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
                      className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
                    />
                  </div>
                </div>
                <div className='w-full lg:w-4/12 px-4  lg:order-3 lg:text-right lg:self-center'>
                  <div className='py-6 px-3 mt-32 sm:mt-0 float-right'>
                    <Tooltip placement='top' title={'Quay Lại Trang Cá Nhân !'}>
                      <Button
                        styleClass='bg-boxdark active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
                        type='button'
                      >
                        Quay Về
                        <PiKeyReturnFill />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                <div className='w-full lg:w-4/12 px-4 lg:order-1'>
                  <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                    <div className='mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>22</span>
                      <span className='text-sm text-blueGray-400'>Bài Thi</span>
                    </div>
                    <div className='mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>10</span>
                      <span className='text-sm text-blueGray-400'>bài thi tự luận</span>
                    </div>
                    <div className='lg:mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>89</span>
                      <span className='text-sm text-blueGray-400'>bài thi trắc nghiệm</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='text-center mt-12'>
                <h3 className='text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2'>Vũ Thành Đô</h3>
                <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                  <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400' />
                  Hà Nội - Mỹ Đình
                </div>
              </div>
              <div className='mt-10 py-10 border-t border-blueGray-200 text-center'></div>
            </div>
          </div>
        </div>
        <footer className='relative bg-blueGray-200 pt-8 pb-6 mt-8'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-wrap items-center md:justify-between justify-center'>
              <div className='w-full md:w-6/12 px-4 mx-auto text-center'>
                <p>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  )
}

export default UserProfile
