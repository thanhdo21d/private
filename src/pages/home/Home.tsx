import React from 'react'
import { motion } from 'framer-motion'
import styles from './home.module.css'
import book from '../../assets/book.png'
import fadeIn from '~/utils/animation/variant'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='relative'>
      <div className={`${styles['hero-banner']} absolute`}>
        <div>
          <Header />
        </div>
        <div className={styles.content}>
          <div className={`${styles['text-content']} `}>
            <h1> DENSO</h1>
            <p>Empowering Excellence: Elevating Employee Performance Through Innovative Testing Solutions</p>
            <div className={styles.ctas}>
              <div className={styles['banner-cta']}> Read More</div>
              <button
                onClick={() => navigate('/home')}
                className={`${styles['banner-cta']} ${styles.v2} overflow-hidden bg-fixed opacity-100 transition duration-300 ease-in-out hover:opacity-50 z-999`}
              >
                START NOW
              </button>
            </div>
          </div>
          <motion.img
            variants={fadeIn('up', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.7 }}
            className={`w-1/3 inline-block p-4 text-white ${styles['rotate-book']}`}
            src={book}
            alt='123'
            animate={{ y: [0, -10, 0], rotate: 45 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
