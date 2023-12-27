import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const CheckSessionExams = (props : any): JSX.Element => {
  const idSession = sessionStorage.getItem('idSession2')
  const navigate = useNavigate()
  useEffect(() => {
    if (!idSession) {
      navigate('*')
    }
  }, [idSession, navigate])
  return <>{idSession ? <Outlet /> : <Navigate to='*' replace />}</>
}

export default CheckSessionExams
