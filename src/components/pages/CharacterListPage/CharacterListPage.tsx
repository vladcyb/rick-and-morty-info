import { useEffect, useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { Filters } from '@components/pages/CharacterListPage/Filters'
import { CharacterCard } from '@sharedComponents/CharacterCard'
import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { thunks } from '@app/slices/thunks'

import { Search } from './Search'

import './CharacterListPage.scss'


function getPageInRange(newPageValue: number, countOfPages: number) {
  return Math.min(Math.max(newPageValue, 1), countOfPages)
}

export const CharacterListPage = () => {
  const dispatch = useAppDispatch()

  const {
    data: characters,
  } = useSelector(getCharacters)

  const [searchParams, setSearchParams] = useSearchParams()

  const countOfPages = characters.info?.pages

  const searchName = searchParams.get('name') ?? ''
  const searchPage = searchParams.get('page') ?? '1'
  const currentPage = parseInt(searchPage)

  const paginationLinks = useMemo(() => {
    const getPrevOrNextPageLink = (isPrev: boolean) => {
      let query = `?page=${getPageInRange(currentPage + (-1) ** Number(isPrev), countOfPages ?? 1)}`
      if (searchName) {
        query += `&name=${searchName}`
      }
      return query
    }

    return {
      prev: getPrevOrNextPageLink(true),
      next: getPrevOrNextPageLink(false),
    }
  }, [searchPage, countOfPages])

  useEffect(() => {
    dispatch(thunks.character.getCharacters({
      page: currentPage,
      name: searchName,
      status: searchParams.get('status') ?? '',
    }))
  }, [searchParams])

  return (
    <div className="index-page">
      <div className="border-bottom">
        <div className="mx-auto w-50 py-4">
          <Search />
        </div>
      </div>
      <main className="index-page__main">
        <div className="index-page__sidebar border-end py-5 px-3">
          <Filters />
        </div>
        <div className="index-page__main-content pt-5 px-4">
          <div className="index-page__characters">
            {characters.results?.length ? (
              characters.results.map(item => <CharacterCard data={item} key={item.id} />)
            ) : (
              <>Ничего не найдено.</>
            )}
          </div>
          <Pagination className="mt-4">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setSearchParams(paginationLinks.prev)}
            />
            <Pagination.Next
              disabled={currentPage === countOfPages}
              onClick={() => setSearchParams(paginationLinks.next)}
            />
          </Pagination>
        </div>
      </main>
    </div>
  )
}
