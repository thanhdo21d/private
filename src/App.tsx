import { RouterProvider } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { routers } from './routes'
import 'react-toastify/dist/ReactToastify.css'
import { pause } from './utils/utils'
import { useState } from 'react'
import { Loader } from './common'
const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  pause(2000).then(() => {
    setIsLoading(false)
  })
  if (isLoading) return <Loader />
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer autoClose={1000} transition={Slide} />
    </>
  )
}

export default App
