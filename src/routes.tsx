import { RouteObject } from 'react-router-dom'

import { Layout } from '@app/Layout'
import { CharacterPage } from '@components/pages/CharacterPage'
import { CharacterListPageContainer } from '@components/pages/CharacterListPage/CharacterListPageContainer'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <CharacterListPageContainer />,
      },
      {
        path: 'character',
        element: <CharacterPage />,
      },
    ],
  },
]
