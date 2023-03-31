import { RouteObject } from 'react-router-dom'

import { Layout } from '@app/Layout'
import { IndexPage } from '@components/pages/IndexPage'
import { CharacterPage } from '@components/pages/CharacterPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <IndexPage />,
      },
      {
        path: 'character',
        element: <CharacterPage />,
      },
    ],
  },
]
