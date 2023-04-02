
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { getCharacters } from '@slices/characterSlice/selectors'
import { useAppDispatch } from '@app/slices'
import { thunks } from '@app/slices/thunks'
import { CharacterCard } from '@app/components/CharacterCard'


import './IndexPage.scss'

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
          <input className="form-control" type="text" placeholder="Поиск" />
        </div>
      </div>
      <main className="index-page__main mt-3 px-5">
        <div className="index-page__sidebar">
          Filters
        </div>
        <div className="index-page__characters">
          {characters.map(item => <CharacterCard data={item} key={item.id} />)}
        </div>
      </main>
    </div>
  )
}
