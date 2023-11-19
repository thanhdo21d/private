import { Badge, Breadcrumb, Button, Descriptions, DescriptionsProps, Skeleton, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { PiKeyReturn } from 'react-icons/pi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetDetailsExamsQuery, useGetIdDepartmentQuery } from '~/apis/department/department'

const DetailsExams = () => {
  const url = import.meta.env.VITE_API
  const { id } = useParams()
  const [queryParameters] = useSearchParams()
  const [showImage, setShowImage] = useState<boolean>(false)
  const [Image, setImage] = useState<string>('')
  const navigate = useNavigate()
  const dataExamsQuery: string | null = queryParameters.get('exams')
  const { data: getDetailsExams, isFetching: isDeailFetching } = useGetDetailsExamsQuery({
    idDepartment: id
  })
  console.log(getDetailsExams)
  const items: DescriptionsProps['items'] = [
    {
      key: '3',
      label: <p className='font-bold text-md'>Câu hỏi</p>,
      children: <p>{getDetailsExams?.dataDepartments?.question}</p>,
      span: 2
    },
    {
      key: '4',
      label: 'Ảnh Câu Hỏi',
      children: (
        <p
          className='cursor-pointer '
          onClick={() => {
            setShowImage(!showImage)
            setImage(`${url}${getDetailsExams?.dataDepartments?.image[0]}`)
          }}
        >
          {getDetailsExams?.dataDepartments?.image[0] && (
            <Tooltip title='Click details'>
              <img className='w-[80px] hover:scale-125' src={`${url}${getDetailsExams?.dataDepartments?.image[0]}`} />
            </Tooltip>
          )}
        </p>
      )
    },
    {
      key: '5',
      label: <p className='font-bold text-md'>Đáp án</p>,
      children: (
        <div className=''>
          {getDetailsExams?.dataDepartments?.choose?.map((item: any, index: number) => (
            <div key={index} className='w-full h-fit border my-2 shadow-xl rounded-md   border-danger'>
              <p className='flex gap-2 items-center ml-5 mt-2 py-5'>
                <span className='bg-danger flex justify-center items-center w-[30px] h-[30px] rounded-full text-white font-bold'>
                  {index === 0 && <a>A</a>}
                  {index === 1 && <a>B</a>}
                  {index === 2 && <a>C</a>}
                  {index === 3 && <a>D</a>}
                </span>
                <span> : {item.q}</span>
              </p>
              <span
                onClick={() => {
                  setImage(`${url}${item.img}`)
                  setShowImage(!showImage)
                }}
              >
                {item.img && (
                  <Tooltip title='Click details'>
                    <img className='w-[80px] ml-5 mt-2 mb-5 hover:scale-110 cursor-pointer' src={`${url}${item.img}`} />
                  </Tooltip>
                )}
              </span>
            </div>
          ))}
          {/*  */}
        </div>
      ),
      span: 3
    },
    {
      key: '6',
      label: <p className='font-bold text-md'>đáp án đúng</p>,
      children: <Badge status='processing' text={getDetailsExams?.dataDepartments?.answer} />,
      span: 3
    },
    {
      key: '7',
      label: <p className='font-bold text-md'>điểm số</p>,
      children: <p>{getDetailsExams?.dataDepartments?.point}</p>,
      span: 3
    }
  ]
  return (
    <div className='relative m-10'>
      <Breadcrumb
        items={[
          {
            title: 'Trang Quản Trị'
          },
          {
            title: 'Chi Tiết Câu Hỏi'
          }
        ]}
      />
      {showImage && (
        <div
          onClick={() => setShowImage(false)}
          className='absolute inset-0 w-full  h-screen bg-black bg-opacity-5 flex mx-auto justify-center items-center'
        >
          <div className='w-1/3 flex mx-auto justify-center items-center'>
            <img className='w-full h-full' src={Image} />
          </div>
        </div>
      )}
      <div>
        <Button
          className='flex hover:bg-warning hover:text-white  items-center gap-3 mt-10'
          onClick={() => navigate(-1)}
        >
          <span>
            <PiKeyReturn className='bg-success' />
          </span>
          <span className='hover:text-white '>Quay Lại</span>
        </Button>
      </div>
      <div className='border-t border-black my-2 pt-4 '>
        {isDeailFetching ? (
          <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <Descriptions title='Chi Tiết Câu Hỏi' bordered items={items} />
        )}
      </div>
    </div>
  )
}

export default DetailsExams
