import { Popconfirm, Tooltip } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '~/components'
import pdfExport from '../../../assets/images/logo/pdf-svgrepo-com.svg'
import excelExport from '../../../assets/images/logo/excel2-svgrepo-com.svg'

const DetailsResult = () => {
  return (
    <div>
      <div className='flex gap-3 justify-end'>
        <div className=' items-center text-center hover:bg-primary bg-bodydark2 rounded-lg h-[62px]'>
          <Tooltip placement='top' title={'Export to Pdf !'}>
            <img className='w-[50px] pt-1' src={pdfExport} />
          </Tooltip>
        </div>

        <div className=' items-center text-center hover:bg-primary bg-bodydark2 rounded-lg h-[62px]'>
          <Tooltip placement='top' title={'Export to Excel !'}>
            <img className='w-[50px] pt-1' src={excelExport} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
export default DetailsResult
