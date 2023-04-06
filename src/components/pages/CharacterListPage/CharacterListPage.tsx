import { useSearchParams } from 'react-router-dom'

import { CharactersPagination } from '@components/pages/CharacterListPage/CharactersPagination'
import { QueryResult } from '@sharedComponents/QueryResult'
import { useGetAllCharactersQuery } from '@app/api'

import { CharacterCard } from './CharacterCard'
import { AsideFilters } from './AsideFilters'
import { Search } from './Search'

import './CharacterListPage.scss'


export const CharacterListPage = () => {
  const [searchParams] = useSearchParams()

  const searchName = searchParams.get('name') ?? ''
  const searchPage = searchParams.get('page') ?? '1'
  const currentPage = parseInt(searchPage)

  const queryResult = useGetAllCharactersQuery({
    page: currentPage,
    name: searchName,
    status: searchParams.get('status') ?? '',
    gender: searchParams.get('gender') ?? '',
  })

  return (
    <div className="characters-list-page">
      <div className="border-bottom">
        <div className="mx-auto w-50 py-4">
          <Search />
        </div>
      </div>
      <main className="characters-list-page__main">
        <div className="characters-list-page__sidebar border-end py-5 px-3">
          <AsideFilters />
        </div>
        <div className="characters-list-page__main-content pt-5 px-4">
          <QueryResult
            data={queryResult.data?.results}
            renderData={(data) => (
              <div className="characters-list-page__characters">
                {data.map((item) => <CharacterCard data={item} key={item.id} />)}
              </div>
            )}
            queryResult={queryResult}
            isLoading={queryResult.isFetching}
          />
          <CharactersPagination currentPage={currentPage} queryResult={queryResult} />
        </div>
      </main>
    </div>
  )
}
