import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '~/components'

const CheckDetailsComponent = ({ data }: { data: number }) => {
  const navigate = useNavigate()
  return (
    <Button
      styleClass='mb-5 w-[300px]'
      onClick={() => {
        if (data === 1) {
          navigate({
            search: createSearchParams({
              exams: 'easy'
            }).toString()
          })
        }
        if (data === 2) {
          navigate({
            search: createSearchParams({
              exams: 'normal'
            }).toString()
          })
        }
        if (data === 3) {
          navigate({
            search: createSearchParams({
              exams: 'hard'
            }).toString()
          })
        }
      }}
    >
      {data === 1 && <span>Thêm Đề Thi Dễ </span>}
      {data === 2 && <span>Thêm Đề Thi Trung Bình </span>}
      {data === 3 && <span>Thêm Đề Thi Khó </span>}
    </Button>
  )
}
export const itemsDataBeardCrumb = [
  {
    key: '2',
    label: (
      <Link className=' hover:font-bold' to={{ search: createSearchParams({ exams: 'easy' }).toString() }}>
        Đề Dễ
      </Link>
    ),
    children: <CheckDetailsComponent data={1} />
  },
  {
    key: '3',
    label: (
      <Link className=' hover:font-bold' to={{ search: createSearchParams({ exams: 'normal' }).toString() }}>
        Đề Trung Bình
      </Link>
    ),
    children: <CheckDetailsComponent data={2} />
  },
  {
    key: '4',
    label: (
      <Link className='h-[10px]  ' to={{ search: createSearchParams({ exams: 'hard' }).toString() }}>
        Đề Khó
      </Link>
    ),
    children: <CheckDetailsComponent data={3} />
  }
]
