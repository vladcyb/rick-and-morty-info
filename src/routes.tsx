import { Navigate, RouteObject } from 'react-router-dom'

import { CharacterListPage } from '@components/pages/CharacterListPage'
import { Layout } from '@app/Layout'
import { CharacterPage } from '@components/pages/CharacterPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <CharacterListPage />,
      },
      {
        path: 'character/:id',
        element: <CharacterPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]
