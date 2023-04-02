import { RouteObject } from 'react-router-dom'

import { Layout } from '@app/Layout'
import { CharacterListPage } from '@components/pages/CharacterListPage'
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
        path: 'character',
        element: <CharacterPage />,
      },
    ],
  },
]
