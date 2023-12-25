import { Button, DatePicker, Divider, Form, Skeleton, Table } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Footer } from 'antd/es/layout/layout'
import React from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetMakingExamsDepartMentQuery } from '~/apis/making/makingExamDepartment'
import useQueryConfig from '~/hooks/configPagination/useQueryConfig'

const GetAllExamsDepartment = () => {
  const idCate = localStorage.getItem('idCategories')
  const { id } = useParams()
  const aliasFolder = location.pathname.includes(`examiner-Exams`)

  const [queryParameters] = useSearchParams()
  const queryConfig = useQueryConfig()
  const dataPageQuery: string | null = queryParameters.get('marking')
  const dataNameQuery: string | null = queryParameters.get('nameExams')
  const navigate = useNavigate()
  const {
    data: dataMaking,
    isFetching,
    isLoading
  } = useGetMakingExamsDepartMentQuery({
    id: id as string,
    marking: (dataPageQuery as string) || '0',
    nameExams: (dataNameQuery as string) || ''
  })
  const dataSource = dataMaking?.map(
    ({
      _id,
      correct_answer,
      fail_answer,
      score,
      nameExams,
      isCheck
    }: {
      _id: string
      correct_answer: string
      fail_answer: string
      score: string
      nameExams: string
      isCheck: string
    }) => ({
      key: _id,
      nameExams: nameExams,
      correct_answer: correct_answer,
      fail_answer: fail_answer,
      score: score,
      isCheck: isCheck
    })
  )
  const columns = [
    {
      title: 'Tên bài thi',
      dataIndex: 'nameExams',
      key: 'nameExams',
      render: (items: string) => {
        return <p className='flex justify-start'>{items}</p>
      }
    },
    {
      title: 'Câu đúng',
      dataIndex: 'correct_answer',
      key: 'correct_answer',
      render: (items: string) => {
        return <p className='flex justify-start'>{items}</p>
      }
    },
    {
      title: 'Câu sai',
      dataIndex: 'fail_answer',
      key: 'fail_answer',
      render: (items: string) => {
        return <p className='flex justify-start'>{items}</p>
      }
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: (items: string) => {
        return <p className='flex justify-start'>{items}</p>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isCheck',
      key: 'isCheck',
      render: (items: string) => {
        return (
          <p
            className={`flex justify-start ${
              items == '0' ? 'text-danger font-semibold text-md' : 'text-success font-semibold text-md'
            }`}
          >
            {items == '0' ? 'Chưa chấm' : 'Đã chấm'}
          </p>
        )
      }
    },
    {
      title: <p className='flex justify-center'>tác vụ</p>,
      render: ({ key: id }: { key: string }) => {
        return (
          <div className='flex justify-center'>
            {aliasFolder ? (
              <Button onClick={() => navigate(`/examiner/cham-thi/${id}`)}>chi tiết</Button>
            ) : (
              <Button onClick={() => navigate(`/tree-menu/${idCate}/settings/cham-thi-user/${id}`)}>chi tiết</Button>
            )}
          </div>
        )
      }
    }
  ]
  const onDateChange: RangePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
    // dispatch(setLoggerDate({ startDate: dateString[0], endDate: dateString[1] }))
    // navigate({
    //   search: createSearchParams({
    //     ...queryConfig,
    //     startDate: dateString[0],
    //     endDate: dateString[1]
    //   }).toString()
    // })
  }
  if (isFetching || isLoading)
    return (
      <div>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  return (
    <div>
      <div className='mb-5'>
        <Divider orientation='left'>Danh sách bài thi </Divider>
      </div>
      <div className='my-10'>
        {aliasFolder ? (
          <Button className='w-[200px]' onClick={() => navigate(`/user-info/danh-sach-bai-thi`)}>
            Quay lại
          </Button>
        ) : (
          <Button className='w-[200px]' onClick={() => navigate(`/tree-menu/${idCate}/settings/ki-thi`)}>
            Quay lại
          </Button>
        )}
      </div>
      <div className='flex justify-between items-center'>
        <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
          <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='grid-state'>
            Trạng Thái
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              id='grid-state'
              onChange={(event) => {
                const selectedValue = event.target.value
                navigate({
                  search: createSearchParams({
                    ...queryConfig,
                    marking: selectedValue
                  }).toString()
                })
              }}
            >
              <option value='0'>Chưa chấm</option>
              <option value='1'>Đã chấm</option>
            </select>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
      <div>
        <Footer className='mt-5  flex justify-between '>
          <div className='text-md font-semibold text-center '>
            Copyright © 2023 DMVN/IS-APPLICATION. All rights reserved. <br />
            design by thanhdo
          </div>
        </Footer>
      </div>
    </div>
  )
}

export default GetAllExamsDepartment
