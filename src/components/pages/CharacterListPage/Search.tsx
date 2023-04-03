import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useCallback, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('name') ?? '')

  const handleChange = useCallback((value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', '1')
    newSearchParams.set('name', value)
    setSearchParams(newSearchParams.toString())
  }, [searchParams])

  const debouncedCallback = useDebouncedCallback((value: string) => handleChange(value), 300)

  const ref = useRef<HTMLInputElement>(null)

  return (
    <InputGroup>
      <Form.Control
        placeholder="Поиск"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          debouncedCallback(e.target.value)
        }}
        ref={ref}
      />
      <Button
        variant="outline-secondary"
        onClick={() => {
          setSearch('')
          handleChange('')
          ref.current?.focus()
        }}
      >
        Очистить
      </Button>
    </InputGroup>
  )
}
