import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import heloUser from '../../assets/hello (1).png'
import { Avatar, Button, Modal, UploadFile, UploadProps } from 'antd'
import useGreetings from '~/hooks/useGretting'
import { toastService } from '~/utils/toask/toaskMessage'
import axios from 'axios'
import { useGetIdUserQuery } from '~/apis/user/user.api'
import { Skeleton } from 'antd/es'
const UserProfile = () => {
  const { profile } = useContext(AppContext)
  const greeting = useGreetings()
  const [file, setFile] = useState<any>(null)
  const { data: dataUser, isLoading, isFetching } = useGetIdUserQuery(profile?._id as string)
  console.log(dataUser)
  const uri = import.meta.env.VITE_API
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('userId', profile?._id as string)
    try {
      await axios.post(`${uri}upload-avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toastService.success('Avatar uploaded successfully')
      setTimeout(() => {
        window.location.reload()
      }, 350)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className='profile-page'>
      {isLoading || isFetching ? (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <section className='relative block '>
          <div className='h-full'>
            <div className='border-b-2 block md:flex'>
              <div className='w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md'>
                <div className='2xl:flex justify-between items-center'>
                  <div className='flex items-center gap-5'>
                    <span className='text-xl font-semibold block'>Xin Chào {profile?.username}</span>
                    <img className='w-[50px] waving-image' src={`${heloUser}`} />
                  </div>
                  <p className='text-sm my-2 font-semibold block'>{greeting}</p>
                </div>
                <span className='text-gray-600'>This information is secret so be careful</span>
                <div className='w-full p-8 mx-2 flex justify-center'>
                  <Avatar size={224} icon={<img src={`${uri}${dataUser?.user?.avatar}`} />} />
                </div>
                <div>
                  <form onSubmit={handleSubmit} className='flex justify-center'>
                    <label
                      htmlFor='fileInput'
                      className='flex items-center w-1/2 justify-center mx-2 py-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                    >
                      <input
                        type='file'
                        id='fileInput'
                        onChange={(e: any) => setFile(e.target.files[0])}
                        style={{ display: 'none' }}
                      />
                      Select Image
                    </label>
                    <button type='submit' className='bg-success px-2 rounded-md text-white font-medium'>
                      Upload
                    </button>
                  </form>
                </div>
              </div>
              <div className='w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md'>
                <div className='rounded  shadow p-6'>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      code
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full'
                      type='email'
                      defaultValue={profile?.code}
                    />
                  </div>
                  <div className='pb-6'>
                    <label htmlFor='name' className='font-semibold text-gray-700 block pb-1'>
                      họ tên
                    </label>
                    <div className='flex'>
                      <input
                        disabled
                        id='username'
                        className='border-1 border-[#ccc] rounded-r px-4 py-2 w-full'
                        type='text'
                        defaultValue={profile?.username}
                      />
                    </div>
                  </div>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      Email
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full'
                      type='email'
                      defaultValue={profile?.email}
                    />
                  </div>
                  <div className='pb-4'>
                    <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                      vai trò
                    </label>
                    <input
                      disabled
                      id='email'
                      className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full'
                      type='email'
                      defaultValue={dataUser?.user?.role?.name}
                    />
                    <span className='text-gray-600 pt-4 block opacity-70'>
                      Personal login information of your account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className='relative bg-blueGray-200 pt-8 pb-6 bottom-0 mt-8'>
            <div className='container mx-auto px-4'>
              <div className='flex flex-wrap items-center md:justify-between justify-center'>
                <div className='w-full md:w-6/12 px-4 mx-auto text-center'>
                  <p>Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </section>
      )}
    </main>
  )
}

export default UserProfile
