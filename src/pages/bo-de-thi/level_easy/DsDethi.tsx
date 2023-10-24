import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAllDepartmentQuery } from '~/apis/department/department'
import { Button } from '~/components'
import { IDepartmentType, IDepartmentTypeDocs } from '~/types/department/department.type'

const DsDethi = () => {
  const navigate = useNavigate()
  const { data: dataDepartment } = useGetAllDepartmentQuery()
  console.log(dataDepartment)
  return (
    <div>
      <div className='grid grid-cols-3 gap-5'>
        {dataDepartment?.data.map((data: IDepartmentType) => {
          console.log(data)
          return (
            <div key={data?._id}>
              <div className=''>
                <div className='max-h-full w-[400px] max-w-xl overflow-y-auto sm:rounded-2xl bg-white'>
                  <div className='w-full'>
                    <div className='m-8 my-20 max-w-[400px] mx-auto'>
                      <div className='mb-8'>
                        <div className='text-center animate-bounce mx-auto flex justify-center'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            x='0px'
                            y='0px'
                            width='48'
                            height='48'
                            viewBox='0 0 48 48'
                          >
                            <path
                              fill='#4caf50'
                              d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
                            ></path>
                            <path
                              fill='#ccff90'
                              d='M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z'
                            ></path>
                          </svg>
                        </div>
                        <p className='text-gray-600 text-center'>Bộ Đề Thi {data?.name}.</p>
                      </div>
                      <div className='space-y-4 mt-5 justify-center flex'>
                        <button
                          onClick={() => navigate(`/admin/details/dethi/${data?._id}`)}
                          className='p-3 bg-danger rounded-full text-white w-[70%] font-semibold'
                        >
                          xem Đề Thi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DsDethi
