import { Navigate, useSearchParams } from 'react-router-dom'

import { CharacterListPage } from './CharacterListPage'

export const CharacterListPageContainer = () => {
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') as string)

  if (typeof page !== 'number' || isNaN(page) || page < 1) {
    return <Navigate to="?page=1" replace={true} />
  }

  return <CharacterListPage page={page} />
}
