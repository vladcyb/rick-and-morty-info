
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'

import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { thunks } from '@app/slices/thunks'
import { CharacterCard } from '@app/components/CharacterCard'


import './IndexPage.scss'
import { Pagination } from 'react-bootstrap'

export const IndexPage = () => {
  const dispatch = useAppDispatch()
  const [page] = useState(1)

  useEffect(() => {
    dispatch(thunks.character.getCharacters({ page }))
  }, [])

  const characters = useSelector(getCharacters)

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
        <div className="index-page__characters pt-5 px-4">
          {characters.map(item => <CharacterCard data={item} key={item.id} />)}
        </div>
        <Pagination></Pagination>
      </main>
    </div>
  )
}
