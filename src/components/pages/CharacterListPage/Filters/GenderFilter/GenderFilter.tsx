import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { Nullable } from '@app/shared/types'
import { Gender } from '@app/shared/types/CharacterTypes'
import { genders, MapGenderToRussian } from '@app/shared/constants/Genders'

export const GenderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [gender, setGender] = useState<Nullable<Gender>>(searchParams.get('gender') as Nullable<Gender>)

  const handleChangeParams = useDebouncedCallback((status: string, checked: boolean, name: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('gender', checked ? name : '')
    setSearchParams(newSearchParams)
  }, 300)

  return (
    <Form.Group>
      <Form.Label>Пол</Form.Label>
      {genders.map((item) => (
        <Form.Check
          type="checkbox"
          label={MapGenderToRussian[item]}
          name={`gender-${item}`}
          id={`gender-${item}`}
          key={item}
          onChange={(e) => {
            const { checked } = e.target
            setGender(checked ? e.target.name.replace('gender-', '') as Gender : null)
            handleChangeParams(item, checked, item)
          }}
          checked={gender === item}
        />
      ))}
    </Form.Group>
  )
}
