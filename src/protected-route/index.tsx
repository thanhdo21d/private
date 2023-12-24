import { Navigate, useLocation } from 'react-router-dom'
import NotPermitted from './not-permitted'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/contexts/app.contexts'
import axios from 'axios'
const RoleBaseRoute = (props: any) => {
  const { profile } = useContext(AppContext)
  const [hasPermission, setHasPermission] = useState<any>(null)
  const { pathname } = useLocation()
  const uri = import.meta.env.VITE_API
  console.log(`Role `, pathname)
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { data } = await axios.get(`${uri}get/permission/path/${profile?.role}`, {
          params: {
            path: pathname
          }
        })
        console.log(data)
        setHasPermission(data.hasPermission)
      } catch (error) {
        console.error('Error checking permission:', error)
        setHasPermission(false)
      }
    }

    checkPermission()
  }, [pathname, uri, profile?.role])
  if (hasPermission == null) {
    return <p>loading.......</p>
  }
  if (hasPermission) {
    return <>{props.children}</>
  } else {
    return <NotPermitted />
  }
}
const ProtectedRoute = (props: any) => {
  const { profile } = useContext(AppContext)
  return (
    <>
      {profile?._id ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to='/login' replace />
      )}
    </>
  )
}

export default ProtectedRoute
