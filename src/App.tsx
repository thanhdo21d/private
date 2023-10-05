import { Dashboard } from './pages'
import { Route, RouterProvider, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import { ToastContainer } from 'react-toastify'
import { routers } from './routes'
const App = () => {
  return (
    <>
      <RouterProvider router={routers} />
      <ToastContainer />
    </>
  )
}

export default App
