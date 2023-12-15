import { Result } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { result } from 'lodash'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '~/contexts/app.contexts'

const CheckOtherAdmin = () => {
  const cookie = Cookies.get('token')
  const id = localStorage.getItem('idCategories')
  const uri = import.meta.env.VITE_API
  const { profile } = useContext(AppContext)
  const navigate = useNavigate()
  const [permissions, setPermissions] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!cookie) {
      navigate('/login')
    }
  }, [cookie, navigate])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${uri}get/permission/otherAdmin/${profile?._id}`, {
          params: {
            departMentId: id
          }
        })
        setPermissions(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchData()
  }, [id, profile?._id, uri])
  if (loading) return <p>loading....</p>
  return permissions ? (
    <Outlet />
  ) : (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
      extra={<Link to='/'>Back Home</Link>}
    />
  )
}

export default CheckOtherAdmin
