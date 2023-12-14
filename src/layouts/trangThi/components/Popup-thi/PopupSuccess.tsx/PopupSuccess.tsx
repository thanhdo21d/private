import React from 'react'
import { MdDone, MdOutlineError } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { GrClose } from 'react-icons/gr'
import logoFInish from '../../../../../assets/finish-line.png'
import doneExams from '../../../../../assets/check.png'
import errorExams from '../../../../../assets/close.png'
import { useAppSelector } from '~/store/root/hook'
const PopupSuccess = ({ Question }: any) => {
  console.log(Question)
  const { submitData: checkDataSubmit } = useAppSelector((state) => state.examAction)
  console.log(checkDataSubmit, 'pla')
  const navigate = useNavigate()
  const nullAction = Question?.questionCheck?.filter((items: any) => items.userChoose == undefined)
  console.log(nullAction)
  return (
    <div>
      <div className='fixed z-50 left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10'>
        <div className='max-h-full w-[50%]  overflow-y-auto sm:rounded-2xl bg-white  '>
          <div className='w-full'>
            <div className=' my-20 w-[80%] mx-auto'>
              <div className='mb-8'>
                <div className='text-center mx-auto flex justify-center'>
                  <img className='w-[200px] fade-in-out-dm' src={`${logoFInish}`} alt='' />
                </div>
                <p className='text-gray-600 font-semibold text-lg'>
                  Xin chúc mừng, bạn hoàn thành bài thi này nhanh thứ 5 trong số những ng tham gia.
                </p>
                <p className='text-gray-600 text-md'>
                  tổng điểm Trắc Nghiệm : <span className='text-success font-bold text-lg'>{Question?.score} điểm</span>
                </p>
                <p className='text-gray-600'>
                  Thời gian hoàn thành : <span className='text-success font-bold text-lg'>10.02 phút</span>
                </p>
                <div className='text-gray-600'>
                  <p className='flex items-center gap-5 mt-2'>
                    <span>
                      <img className='w-[30px]' src={`${doneExams}`} alt='' />
                    </span>
                    <span className='font-bold text-blue-500'>Số câu đúng : {Question?.correct_answer}</span>
                  </p>
                  <p className='flex items-center gap-5 mt-2'>
                    <span>
                      <img className='w-[30px]' src={`${errorExams}`} alt='' />
                    </span>
                    <span> Số Câu sai : {Question?.fail_answer} </span>
                  </p>
                  <p className='flex  items-center gap-4 mt-2'>
                    <span>
                      <MdOutlineError className='text-[34px]   text-danger font-bold' />
                    </span>
                    <span>chưa trả lời : {nullAction?.length}</span>
                  </p>
                </div>
              </div>
              <div className='space-y-4'>
                <button
                  onClick={() => navigate('/')}
                  className='p-3 bg-black rounded-full text-white w-full font-semibold'
                >
                  Về Trang chủ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(PopupSuccess)
