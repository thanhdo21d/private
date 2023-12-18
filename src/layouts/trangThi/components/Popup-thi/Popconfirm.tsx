import React from 'react'
import { Button } from '~/components'
import ReactDOM from 'react-dom'
import cancel from '../../../../assets/close.png'
const Popconfirm = () => {
  if (typeof document === 'undefined') return <div></div>
  const bodyElement = document.querySelector('#root')
  if (!bodyElement) {
    return null
  }
  console.log('1')
  return <p></p>
}

export default Popconfirm
