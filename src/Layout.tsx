import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { PageHeader } from '@components/PageHeader'

export const Layout = () => (
  <div className="layout bg-blend-color-dodge">
    <PageHeader />
    <Suspense>
      <Outlet />
    </Suspense>
  </div>
)
