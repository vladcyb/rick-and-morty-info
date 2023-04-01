import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { PageHeader } from '@components/PageHeader'

export const Layout = () => (
  <div className="layout">
    <PageHeader />
    <Suspense>
      <Outlet />
    </Suspense>
  </div>
)
