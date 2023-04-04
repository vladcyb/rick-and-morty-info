import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { Nullable } from '@app/shared/types'

interface IFilterProps<T extends string> {
  label: string
  filterKey: string
  items: T[]
  getItemLabel: (item: T) => string
}

export const Filter = <T extends string>({ label, filterKey, items, getItemLabel }: IFilterProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState<Nullable<T>>(searchParams.get(filterKey) as Nullable<T>)

  const handleChangeParams = useDebouncedCallback((status: string, checked: boolean, name: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(filterKey, checked ? name : '')
    setSearchParams(newSearchParams)
  }, 300)

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      {items.map((item) => (
        <Form.Check
          type="checkbox"
          label={getItemLabel(item)}
          name={`${filterKey}-${item}`}
          id={`${filterKey}-${item}`}
          key={item}
          onChange={(e) => {
            const { checked } = e.target
            setValue(checked ? e.target.name.replace(`${filterKey}-`, '') as T : null)
            handleChangeParams(item, checked, item)
          }}
          checked={value === item}
        />
      ))}
    </Form.Group>
  )
}
