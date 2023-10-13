import React from 'react'
import CheckQuesion from '../check-quesion/CheckQuesion'
import QuesionStart from './QuesionStart'
import { Col, Row } from 'antd'

const PopQuesion = () => {
  return (
    <div className=''>
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
