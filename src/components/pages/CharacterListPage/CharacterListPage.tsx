
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

interface ICharacterListPageProps {
  page: number
}

export const CharacterListPage = ({ page }: ICharacterListPageProps) => {
  const dispatch = useAppDispatch()

  const {
    data: characters,
  } = useSelector(getCharacters)

  const [searchParams] = useSearchParams()

  const countOfPages = characters.info?.pages

  const searchName = searchParams.get('name') ?? ''
  const searchPage = searchParams.get('page') ?? ''

  const paginationLinks = useMemo(() => {
    const currentPage = parseInt(searchPage)

    const getPrevOrNextPageLink = (isPrev: boolean) => {
      return `?page=${getPageInRange(currentPage + (-1) ** Number(isPrev), countOfPages ?? 1)}&name=${searchName}`
    }

    return {
      prev: getPrevOrNextPageLink(true),
      next: getPrevOrNextPageLink(false),
    }
  }, [searchPage, countOfPages])

  useEffect(() => {
    dispatch(thunks.character.getCharacters({
      page,
      name: searchName,
    }))
  }, [page, searchName])


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
            <Pagination.Prev href={paginationLinks.prev} disabled={page == 1} />
            <Pagination.Next href={paginationLinks.next} disabled={page == countOfPages} />
          </Pagination>
        </div>
      </main>
    </div>
  )
}
