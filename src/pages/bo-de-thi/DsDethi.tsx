import React from 'react'
import { Button } from '~/components'

const DsDethi = () => {
  return (
    <div>
      <form action='/upload' method='post'>
        <input type='file' name='excelFile'  id='' />
        <Button type='submit'>Thêm Đề Thi</Button>
      </form>
    </div>
  )
}

export default DsDethi
