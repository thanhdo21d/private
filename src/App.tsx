import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState } from 'react'

import { Dashboard } from './pages'
import { Loader } from './common'
import routes from './routes'

const DefaultLayout = lazy(() => import('./layouts/DefaultLayout/DefaultLayout'))

const App = () => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} /> */}
        <Route element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  )
}

export default App
