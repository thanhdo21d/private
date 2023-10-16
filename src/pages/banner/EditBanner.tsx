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
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: bannerData, error, isFetching: isGetBanerLoading } = useGetIdBannersQuery(id || '')
  console.log(bannerData)
  const [updateBanner, { isLoading: isUpdateLoading }] = useUpdateBannerMutation()
  useEffect(() => {
    // đồng bộ dữ liệu từ API fill vào form
    form.setFieldsValue({
      url: bannerData?.data?.url
      // status: bannerData?.data?.status
    })
  }, [bannerData, form, id])
  const onFinish = (values: any) => {
    console.log(values)
    updateBanner({ ...values, _id: id })
      .unwrap()
      .then(() => {
        toastService.success('Banner updated successfully')
        navigate('/admin/banner')
      })
      .catch(() => toastService.error('Error updating banner'))
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
        console.log(imageUrl)
      })
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <>
      <Button styleClass='bg-strokedark font-bold' onClick={() => navigate('/admin/banner')}>
        Quay Lại{' '}
        <span>
          {' '}
          <PiKeyReturnDuotone />
        </span>
      </Button>
      {isGetBanerLoading ? (
        <Skeleton />
      ) : (
        <div className='mx-auto w-[900px] mt-20'>
          <Form
            form={form}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <Form.Item<FieldType>
              label='đường dẫn images'
              name='url'
              rules={[{ required: true, message: 'Please input your Roles!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='submit'>
                {' '}
                {isUpdateLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'update Images'}
              </Button>
            </Form.Item>
          </Form>

          <Upload
            name='avatar'
            listType='picture-circle'
            className='avatar-uploader'
            showUploadList={false}
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
      )}
    </>
  )
}

export default EditBanner
