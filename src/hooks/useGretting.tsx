import { useState, useEffect } from 'react'

const useGreetings = () => {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const getCurrentTime = () => {
      const currentTime = new Date()
      const currentHour = currentTime.getHours()
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Chúc Bạn Buổi Sáng Vui Vẻ ...!')
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Chúc Bạn Buổi Chiều Vui Vẻ ...!')
      } else {
        setGreeting('Chúc Bạn Buổi Tối Vui Vẻ ...!')
      }
    }
    getCurrentTime()
  }, [])

  return greeting
}

export default useGreetings
