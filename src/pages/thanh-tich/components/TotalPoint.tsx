import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const MonthlyRevenue = ({ data }: any) => {
  console.log(data.numberExamLtPoint)
  const data2 = [
    {
      name: 'Số bài thi trên 5 điểm',
      'Số bài thi trên 5 điểm': data.numberExamGtePoint || 0
    },
    {
      name: 'Số bài thi dưới 5 điểm',
      'Số bài thi dưới 5 điểm': data.numberExamLtPoint || 0
    }
  ]
  return (
    <div className='w-full mt-6 h-full rounded-sm border border-stroke bg-white pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5'>
      <h3 className='text-xl font-semibold text-black dark:text-white mb-4'>danh sách điểm </h3>
      <ResponsiveContainer width='100%' height='100%' className={'!h-full min-h-[500px]'}>
        <BarChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='Số bài thi trên 5 điểm' stackId='a' fill='#8884d8' />
          <Bar dataKey='Số bài thi dưới 5 điểm' stackId='a' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
