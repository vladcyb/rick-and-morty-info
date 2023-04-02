
import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { Pagination } from 'react-bootstrap'
import { useEffect } from 'react'

import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { CharacterCard } from '@app/components/CharacterCard'
import { thunks } from '@app/slices/thunks'

import './CharacterListPage.scss'

function getPageInRange(newPageValue: number, countOfPages: number) {
  return Math.min(Math.max(newPageValue, 1), countOfPages)
}

interface ICharacterListPageProps {
  page: number
}

export const CharacterListPage = ({ page }: ICharacterListPageProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunks.character.getCharacters({ page }))
  }, [page])

  const characters = useSelector(getCharacters)

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
