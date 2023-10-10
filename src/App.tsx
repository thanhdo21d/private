import { RouterProvider } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import { routers } from './routes'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer autoClose={1000} transition={Slide} />
    </>
  )
}

export default App
