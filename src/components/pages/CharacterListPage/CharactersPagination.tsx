import { TypedUseQueryStateResult } from '@reduxjs/toolkit/dist/query/react'
import Pagination from 'react-bootstrap/Pagination'
import { useSearchParams } from 'react-router-dom'
import { Character, Info } from 'rickmortyapi'

interface ICharactersPaginationProps {
  currentPage: number
  queryResult: TypedUseQueryStateResult<Info<Character[]>, unknown, any>
}

export const CharactersPagination = ({ currentPage, queryResult }: ICharactersPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const hasNext = !!queryResult?.data?.info?.next

  const getPaginationLinks = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    const getPrevOrNextPageLink = (isPrev: boolean) => {
      newSearchParams.set('page', (currentPage + (-1) ** Number(isPrev)).toString())
      return newSearchParams.toString()
    }

    return {
      prev: getPrevOrNextPageLink(true),
      next: getPrevOrNextPageLink(false),
    }
  }

  if (!queryResult.data) {
    return null
  }

  const pages = queryResult.data.info?.pages || 0

  const goToPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    setSearchParams(newSearchParams)
  }

  const renderItems = () => {
    const showPagesBefore = window.innerWidth < 576 ? 2 : 4
    const showPages = screen.width < 576 ? 5 : 9
    const minItem = Math.max(1, currentPage - showPagesBefore)
    const maxItem = Math.min(minItem + showPages, pages)
    const items = []

    for (let i = minItem; i <= maxItem; i++) {
      items.push(i)
    }

    return items.map((item) => (
      <Pagination.Item
        key={item}
        onClick={() => goToPage(item)}
        active={item === currentPage}
      >
        {item}
      </Pagination.Item>
    ))
  }

  return (
    <Pagination className="mt-4">
      <Pagination.First onClick={() => goToPage(1)} />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => setSearchParams(getPaginationLinks().prev)}
      />
      {renderItems()}
      <Pagination.Next
        disabled={!hasNext}
        onClick={() => setSearchParams(getPaginationLinks().next)}
      />
      <Pagination.Last onClick={() => goToPage(pages)} />
    </Pagination>
  )
}
