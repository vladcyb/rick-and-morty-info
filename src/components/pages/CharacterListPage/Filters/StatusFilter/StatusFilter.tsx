import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { characterStatuses, MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'

export const StatusFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [status, setStatus] = useState(searchParams.get('status'))

  const handleChangeParams = useDebouncedCallback((status: string, checked: boolean, name: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('status', checked ? name : '')
    setSearchParams(newSearchParams)
  }, 300)

  return (
    <Form.Group>
      <Form.Label>Статус</Form.Label>
      {characterStatuses.map((item) => (
        <Form.Check
          type="checkbox"
          label={MapCharacterStatusToRussian[item]}
          name={`status-${item}`}
          id={`status-${item}`}
          key={item}
          onChange={(e) => {
            const { checked } = e.target
            setStatus(checked ? e.target.name.replace('status-', '') : '')
            handleChangeParams(item, checked, item)
          }}
          checked={status === item}
        />
      ))}
    </Form.Group>
  )
}
