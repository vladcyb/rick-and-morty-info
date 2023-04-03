
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Pagination } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { CharacterCard } from '@app/components/CharacterCard'
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

  const [searchParams] = useSearchParams()

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
    }))
  }, [currentPage, searchName])

  return (
    <div className="index-page">
      <div className="border-bottom">
        <div className="mx-auto w-50 py-4">
          <Search />
        </div>
      </div>
      <main className="index-page__main">
        <div className="index-page__sidebar border-end py-5 px-3">
          Filters
        </div>
        <div className="index-page__main-content pt-5 px-4">
          <div className="index-page__characters">
            {characters.results?.map(item => <CharacterCard data={item} key={item.id} />)}
          </div>
          <Pagination className="mt-4">
            <Pagination.Prev href={paginationLinks.prev} disabled={currentPage === 1} />
            <Pagination.Next href={paginationLinks.next} disabled={currentPage === countOfPages} />
          </Pagination>
        </div>
      </main>
    </div>
  )
}
