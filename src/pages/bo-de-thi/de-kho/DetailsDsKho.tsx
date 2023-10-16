import React from 'react'
import { Button } from '~/components'

const DetailsDsKho = () => {
  return (
    <div>
      <form action='/upload' method='post'>
        <input type='file' name='excelFile' id='' />
        <Button type='submit'>Thêm Đề Thi</Button>
      </form>
    </div>
  )
}

export default DetailsDsKho
