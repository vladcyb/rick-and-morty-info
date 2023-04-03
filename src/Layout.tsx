import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { PageHeader } from '@sharedComponents/PageHeader'

import './Layout.scss'

export const Layout = () => (
  <div className="layout">
    <PageHeader />
    <Suspense>
      <Outlet />
    </Suspense>
  </div>
)
