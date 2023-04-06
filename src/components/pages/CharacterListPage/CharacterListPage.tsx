import Pagination from 'react-bootstrap/Pagination'
import { useSearchParams } from 'react-router-dom'

import { QueryResult } from '@sharedComponents/QueryResult'
import { useGetAllCharactersQuery } from '@app/api'

import { CharacterCard } from './CharacterCard'
import { AsideFilters } from './AsideFilters'
import { Search } from './Search'

import './CharacterListPage.scss'


export const CharacterListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchName = searchParams.get('name') ?? ''
  const searchPage = searchParams.get('page') ?? '1'
  const currentPage = parseInt(searchPage)

  const queryResult = useGetAllCharactersQuery({
    page: currentPage,
    name: searchName,
    status: searchParams.get('status') ?? '',
    gender: searchParams.get('gender') ?? '',
  })

  const hasNext = !!queryResult?.data?.info?.next

  const getPaginationLinks = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    const getPrevOrNextPageLink = (isPrev: boolean) => {
      newSearchParams.set('page', (currentPage + (-1) ** Number(isPrev)).toString())
      newSearchParams.set('name', searchName)
      return newSearchParams.toString()
    }

    return {
      prev: getPrevOrNextPageLink(true),
      next: getPrevOrNextPageLink(false),
    }
  }

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
          <Pagination className="mt-4">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setSearchParams(getPaginationLinks().prev)}
            />
            <Pagination.Next
              disabled={!hasNext}
              onClick={() => setSearchParams(getPaginationLinks().next)}
            />
          </Pagination>
        </div>
      </main>
    </div>
  )
}
