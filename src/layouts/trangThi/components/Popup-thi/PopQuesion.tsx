import React from 'react'
import CheckQuesion from '../check-quesion/CheckQuesion'
import QuesionStart from './QuesionStart'
import { Col, Row } from 'antd'
import TesTime2 from './TesTime2'

const PopQuesion = () => {
  return (
    <div className='relative'>
      <div className='absolute -top-15 flex w-full justify-center mx-auto'>
        <div>
          <TesTime2 />
        </div>
      </div>
      <Row>
        <Col span={19}>
          <QuesionStart />
        </Col>
        <Col span={5}>
          <CheckQuesion />
        </Col>
      </Row>
    </div>
  )
}

export default PopQuesion
