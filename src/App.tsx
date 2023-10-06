import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { routers } from './routes'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer />
    </>
  )
}

export default App
