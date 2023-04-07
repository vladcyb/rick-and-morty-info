import { Navigate, RouteObject } from 'react-router-dom'

import { Layout } from '@app/Layout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        async lazy() {
          const { CharacterListPage } = await import('@components/pages/CharacterListPage')
          return { Component: CharacterListPage }
        },
      },
      {
        path: 'character/:id',
        async lazy() {
          const { CharacterPage } = await import('@components/pages/CharacterPage')
          return { Component: CharacterPage }
        },
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]
