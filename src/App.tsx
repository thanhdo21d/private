import { RouterProvider } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { routers } from './routes'
import 'react-toastify/dist/ReactToastify.css'
import { pause } from './utils/utils'
import { useState } from 'react'
import { Loader } from './common'
import { ConfigProvider, theme } from 'antd'
import { useAppSelector } from './store/root/hook'
const App = () => {
  const { theme: currentTheme } = useAppSelector((state) => state.theme)
  const [isLoading, setIsLoading] = useState(true)
  pause(2000).then(() => {
    setIsLoading(false)
  })
  if (isLoading) return <Loader />
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
        }}
      >
        <RouterProvider router={routers} />
        <ToastContainer autoClose={1000} transition={Slide} />
      </ConfigProvider>
    </>
  )
}

export default App
