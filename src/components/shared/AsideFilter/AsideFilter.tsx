import clsx from 'clsx'
import { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'
import Form from 'react-bootstrap/Form'
import { useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { Nullable } from '@app/shared/types'

import './AsideFilter.scss'

interface IFilterProps<T extends string> {
  label: string
  filterKey: string
  items: T[]
  getItemLabel: (item: T) => string
}

export const AsideFilter = <T extends string>({ label, filterKey, items, getItemLabel }: IFilterProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [value, setValue] = useState<Nullable<T>>(searchParams.get(filterKey) as Nullable<T>)
  const [open, setOpen] = useState(true)

  const handleChangeParams = useDebouncedCallback((status: string, checked: boolean, name: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set(filterKey, checked ? name : '')
    setSearchParams(newSearchParams)
  }, 300)

  return (
    <Form.Group className={clsx('aside-filter', { 'aside-filter_open': open })}>
      <button
        className="aside-filter__collapse-btn border"
        onClick={() => setOpen(open => !open)}
        type="button"
      >
        <small>
          {label}
        </small>
      </button>
      <Collapse in={open}>
        <div className="py-2">
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
        </div>
      </Collapse>
    </Form.Group>
  )
}
