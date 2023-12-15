import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const CheckLogin = () => {
  const cookie = Cookies.get('token')
  const navigate = useNavigate()
  useEffect(() => {
    if (!cookie) {
      navigate('/login')
    }
  }, [cookie, navigate])
  return cookie ? <Outlet /> : <Navigate to='/login' />
}

export default CheckLogin
