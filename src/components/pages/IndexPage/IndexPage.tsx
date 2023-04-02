
import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { Pagination } from 'react-bootstrap'
import { Navigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { CharacterCard } from '@app/components/CharacterCard'
import { thunks } from '@app/slices/thunks'

import './IndexPage.scss'

function getPageInRange(newPageValue: number, countOfPages: number) {
  return Math.min(Math.max(newPageValue, 1), countOfPages)
}

export const IndexPage = () => {
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') as string)

  useEffect(() => {
    dispatch(thunks.character.getCharacters({ page }))
  }, [page])

  const characters = useSelector(getCharacters)

  if (typeof page !== 'number' || isNaN(page)) {
    return <Navigate to="?page=1" replace={true} />
  }

  const countOfPages = characters.info?.pages

  return (
    <div className="index-page">
      <div className="border-bottom">
        <div className="mx-auto w-50 py-5">
          <Form.Control placeholder="Поиск" />
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
            <Pagination.Prev href={`?page=${getPageInRange(page - 1, countOfPages ?? 1)}`} disabled={page == 1} />
            <Pagination.Next href={`?page=${getPageInRange(page + 1, countOfPages ?? 1)}`} disabled={page == countOfPages} />
          </Pagination>
        </div>
      </main>
    </div>
  )
}
