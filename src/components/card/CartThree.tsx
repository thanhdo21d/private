import { useNavigate } from 'react-router-dom'
import examIcons from '../../assets/exam (1).png'
const CartThree = ({ data }: any) => {
  console.log(data)
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/user-info/ket-qua-thi')}
      className='rounded-sm cursor-pointer border border-stroke bg-white py-6 px-5 shadow-default dark:border-strokedark dark:bg-boxdark'
    >
      <div className='flex items-center justify-between'>
        <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
          <img src={examIcons} />
        </div>
        <p className='text-base'>Tổng số bài thi</p>
      </div>

      <div className='mt-4'>
        <div className='flex justify-start gap-5 items-center'>
          <span className='text-md font-bold'>{data.count ? data.count : 0}</span>
          <span className='text-sm font-medium'>Bài</span>
        </div>

        <span className='hidden grid-cols-[9fr,1fr] mt-2 items-center gap-1 text-sm font-medium text-meta-3 text-right'>
          <svg
            className='fill-meta-3'
            width='10'
            height='11'
            viewBox='0 0 10 11'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z'
              fill=''
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export default CartThree
