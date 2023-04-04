import Button from 'react-bootstrap/Button'
import { useSearchParams } from 'react-router-dom'

export const ResetButton = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('gender')
    newSearchParams.delete('status')
    newSearchParams.set('page', '1')
    setSearchParams(newSearchParams)
  }

  return (
    <Button className="w-100 mt-3" variant="light" onClick={handleClick}>
      Сбросить фильтры
    </Button>
  )
}
