import { Form, Input, Skeleton, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { PiKeyReturnDuotone } from 'react-icons/pi'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetIdBannersQuery, useUpdateBannerMutation } from '~/apis/banner/banner.api'
import { Button } from '~/components'
import { toastService } from '~/utils/toask/toaskMessage'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Cookies from 'js-cookie'
type FieldType = {
  url?: string
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    toastService.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    toastService.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const EditBanner = () => {
  const [form] = Form.useForm()
  const [file, setFile] = useState<any>(null)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const token = Cookies.get('token')
  console.log(token, 'token')
  const uri = import.meta.env.VITE_API
  const { data: bannerData, error, isFetching: isGetBanerLoading } = useGetIdBannersQuery(id || '')
  console.log(bannerData)
  useEffect(() => {
    form.setFieldsValue({
      url: bannerData?.data?.url
    })
  }, [bannerData, form, id])
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('banner', file)
    formData.append('bannerId', id as string)
    try {
      await axios.post(`${uri}upload-banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      toastService.success('banner uploaded successfully')
      setTimeout(() => {
        window.location.reload()
      }, 350)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Button styleClass='bg-strokedark font-bold' onClick={() => navigate('/admin/banner')}>
        Quay Lại{' '}
        <span>
          {' '}
          <PiKeyReturnDuotone />
        </span>
      </Button>
      <div className='w-full mt-5  p-4 sm:p-6 lg:p-8 bg-white shadow-md'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-5'>
            <span className='text-xl font-semibold block'> Sửa Ảnh </span>
          </div>
          <p className='text-sm font-semibold block'>upload ảnh</p>
        </div>
        <span className='text-gray-600'>vui lòng chọn file và upload</span>
        <div className='w-full p-8 mx-2 flex justify-center'>
          <img className='w-[500px] h-[300px]' src={`${uri}${bannerData?.data.url}`} />
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
    </>
  )
}

export default EditBanner
