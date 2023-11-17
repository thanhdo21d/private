import { useContext, useState } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import heloUser from '../../assets/hello (1).png'
import { Avatar, Button, Modal, UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useGreetings from '~/hooks/useGretting'
import Upload, { RcFile } from 'antd/es/upload'
import UserUpload from '~/components/upload/UploadImage'
import { useUploadImageAvatarUserMutation } from '~/apis/user/user.api'
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const UserProfile = () => {
  const { profile } = useContext(AppContext)
  const greeting = useGreetings()
  const [urlAvatar, setUrlAvatar] = useState({} as any)
  const [upLoadAvartaUser, { isLoading: isUploadImageLoading }] = useUploadImageAvatarUserMutation()
  console.log(profile)

  return (
    <main className='profile-page'>
      <section className='relative block '>
        <div className='h-full'>
          <div className='border-b-2 block md:flex'>
            <div className='w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-5'>
                  <span className='text-xl font-semibold block'>Xin Chào {profile?.username}</span>
                  <img className='w-[50px] waving-image' src={`${heloUser}`} />
                </div>
                <p className='text-sm font-semibold block'>{greeting}</p>
              </div>
              <span className='text-gray-600'>This information is secret so be careful</span>
              <div className='w-full p-8 mx-2 flex justify-center'>
                <Avatar size={224} icon={<img src={`${profile?.avatar}`} />} />
              </div>
              <form className='flex justify-center'>
                <label
                  htmlFor='fileInput'
                  className='flex items-center w-1/2 justify-center  mx-2 bg-[#D7B978] group rounded-md shadow-lg cursor-pointer hover:text-white text-white hover:font-bold transition-all'
                >
                  <input type='file' />
                </label>
                <button type='submit'>Upload</button>
              </form>
            </div>
            <div className='w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md'>
              <div className='rounded  shadow p-6'>
                <div className='pb-6'>
                  <label htmlFor='name' className='font-semibold text-gray-700 block pb-1'>
                    Name
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
                <div className='pb-4'>
                  <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                    address
                  </label>
                  <input
                    disabled
                    id='email'
                    className='border-1 border-[#ccc]   rounded-r px-4 py-2 w-full'
                    type='email'
                    defaultValue={profile?.address}
                  />
                </div>

                <div className='pb-4'>
                  <label htmlFor='about' className='font-semibold text-gray-700 block pb-1'>
                    role
                  </label>
                  <input
                    disabled
                    id='email'
                    className='border-1 border-[#ccc]  rounded-r px-4 py-2 w-full'
                    type='email'
                    defaultValue={profile?.role?.name}
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
    </main>
  )
}

export default UserProfile
