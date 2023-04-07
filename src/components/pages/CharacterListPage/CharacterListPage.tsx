import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'

import { CharactersPagination } from '@components/pages/CharacterListPage/CharactersPagination'
import { QueryResult } from '@sharedComponents/QueryResult'
import { useGetAllCharactersQuery } from '@app/api'

import { CharacterCard } from './CharacterCard'
import { AsideFilters } from './AsideFilters'
import { Search } from './Search'

import './CharacterListPage.scss'

function changeBodyOverflow(areFiltersOpened: boolean) {
  if (areFiltersOpened) {
    document.body.classList.add('overflow-hidden', 'overflow-md-scroll')
  } else {
    document.body.classList.remove('overflow-hidden', 'overflow-md-scroll')
  }
}

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

  const [areFiltersOpened, setAreFiltersOpened] = useState(false)

  const closeFilters = useCallback(() => setAreFiltersOpened(false), [])
  const openFilters = useCallback(() => setAreFiltersOpened(true), [])

  useEffect(() => {
    changeBodyOverflow(areFiltersOpened)
  }, [areFiltersOpened])

  return (
    <div className="characters-list-page">
      <div className="border-bottom border-right border-left characters-list-page__controls">
        <div className="w-100 px-2 pt-2 py-md-4 border-md-bottom">
          <Search className="w-100 w-md-50 mx-auto" />
        </div>
        <div className="p-2 d-md-none">
          <Button className="w-100" variant="outline-dark" onClick={openFilters}>
          Фильтры
          </Button>
        </div>
      </div>
      <main className="characters-list-page__main">
        <AsideFilters
          className={clsx(
            'characters-list-page__sidebar border-end p-3 p-md-3',
            { 'characters-list-page__sidebar_open': areFiltersOpened },
          )}
          close={closeFilters}
        />
        <div className="characters-list-page__main-content p-2 pt-0 p-md-3">
          <QueryResult
            data={queryResult.data?.results}
            renderData={(data) => (
              <div className="characters-list-page__characters">
                {data.map((item) => <CharacterCard className="characters-list-page__item" data={item} key={item.id} />)}
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
