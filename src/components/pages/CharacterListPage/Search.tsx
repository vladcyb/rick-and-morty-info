import Form from 'react-bootstrap/Form'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'
import { Button, InputGroup } from 'react-bootstrap'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('name') ?? '')

  const debouncedCallback = useDebouncedCallback((value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('name', value)
    newSearchParams.set('page', '1')
    setSearchParams(`?${newSearchParams.toString()}`)
  }, 300)

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
          ref.current?.focus()
        }}
      >
        Очистить
      </Button>
    </InputGroup>
  )
}
