import clsx from 'clsx'
import { InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'

import './Search.scss'

interface ISearchProps {
  className?: string;
}

export const Search = ({ className }: ISearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const name = searchParams.get('name') ?? ''
  const [search, setSearch] = useState(name)

  const handleChange = useCallback((value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', '1')
    newSearchParams.set('name', value)
    setSearchParams(newSearchParams.toString(), { replace: true })
  }, [searchParams])

  useEffect(() => setSearch(name), [name])

  const debouncedCallback = useDebouncedCallback((value: string) => handleChange(value), 300)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <InputGroup className={clsx('characters-search', className)}>
      <Form.Control
        placeholder="Поиск"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          debouncedCallback(e.target.value)
        }}
        ref={ref}
      />
      <button
        className="btn btn-outline-secondary characters-search__clear"
        onClick={() => {
          setSearch('')
          handleChange('')
          ref.current?.focus()
        }}
      />
    </InputGroup>
  )
}
