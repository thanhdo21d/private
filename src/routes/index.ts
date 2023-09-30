// import { Dashboard } from '~/pages'

import { ProductPage, ToppingPage } from '~/pages'

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))

const coreRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/manager/products',
    title: 'Products',
    component: ProductPage
  },
  {
    path: '/manager/toppings',
    title: 'Products',
    component: ToppingPage
  }
]

const routes = [...coreRoutes]
export default routes
