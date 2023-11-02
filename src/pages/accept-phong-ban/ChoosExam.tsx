import React from 'react'
import { Card, Col, Row } from 'antd'
import { motion } from 'framer-motion'
import fadeIn from '~/utils/animation/variant'
import { useNavigate } from 'react-router-dom'
const ChoosExam = () => {
  const navigate = useNavigate()
  return (
    <div className='mx-5'>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            onClick={() => navigate('/action-bai-thi')}
            className='hover:bg-stroke cursor-pointer'
            title='kì thi khảo sát help desk'
            bordered={false}
          >
            <motion.p
              variants={fadeIn('up', 0.25)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
            >
              Card content
            </motion.p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            onClick={() => navigate('/action-bai-thi')}
            className='hover:bg-stroke cursor-pointer'
            title='kì thi đánh giá chất lương audit'
            bordered={false}
          >
            <motion.p
              variants={fadeIn('up', 0.25)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
            >
              Card content
            </motion.p>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            onClick={() => navigate('/action-bai-thi')}
            className='hover:bg-stroke cursor-pointer'
            title='kì thi đánh giá chất lương legal'
            bordered={false}
          >
            <motion.p
              variants={fadeIn('up', 0.25)}
              initial='hidden'
              whileInView={'show'}
              viewport={{ once: false, amount: 0.7 }}
            >
              Card content
            </motion.p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ChoosExam
