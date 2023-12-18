import { Link } from 'react-router-dom'
import logoMember from '../../assets/images/download (1).png'
import logoExam from '../../assets/exam (1).png'
import logoDepartment from '../../assets/images/download.png'
import logoAdmin from '../../assets/user.png'

const CardOne = ({ data, user, depaermenrt, exam, path, otherAdmin }: any) => {
  console.log(data)

  return (
    <div className='rounded-md border border-stroke bg-white py-6 px-3 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex justify-between items-center'>
        <div>
          <h4 className='text-title-sm dark:text-white font-bold text-black'>
            {user && 'Thành viên'}
            {depaermenrt && 'Phòng ban'}
            {exam && 'Bài thi'}
            {otherAdmin && 'Admin khác'}
          </h4>
        </div>
        <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
          {user && <img className='w-[60px]' src={logoMember} />}
          {depaermenrt && <img className='w-[60px]' src={logoDepartment} />}
          {exam && <img className='w-[60px]' src={logoExam} />}
          {otherAdmin && <img className='w-[60px]' src={logoAdmin} />}
        </div>
      </div>
      <div className='flex items-end justify-between mt-4'>
        <div>
          <h4 className='text-title-md dark:text-white font-bold text-black'>
            {user && data.countUser}
            {depaermenrt && data.countDepartment}
            {exam && data.countExam}
            {otherAdmin && data.countOtherAdmin}
          </h4>
          <Link to={`${path}`} className='text-sm pt-2 font-medium underline'>
            Total views
          </Link>
        </div>
        <span className='text-meta-3 flex items-center gap-1 text-sm font-medium'>
          0.43%
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

export default CardOne
