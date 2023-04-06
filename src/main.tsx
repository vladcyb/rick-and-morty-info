import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { api } from '@app/api'

import { routes } from './routes'

import './index.scss'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>,
)
