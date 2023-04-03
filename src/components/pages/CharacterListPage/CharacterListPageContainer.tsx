import { Navigate, useSearchParams } from 'react-router-dom'

import { CharacterListPage } from './CharacterListPage'

export const CharacterListPageContainer = () => {
  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') as string)
  const name = searchParams.get('name')

  const newSearchParams = new URLSearchParams(searchParams)

  let shouldReplaceFilters = false

  if (typeof page !== 'number' || isNaN(page) || page < 1) {
    newSearchParams.set('page', '1')
    shouldReplaceFilters = true
  }

  if (typeof name !== 'string') {
    newSearchParams.set('name', '')
    shouldReplaceFilters = true
  }

  if (shouldReplaceFilters) {
    return <Navigate to={`?${newSearchParams.toString()}`} replace={true} />
  }

  return <CharacterListPage page={page} />
}
