import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'

import { CharacterPageCard } from '@components/pages/CharacterPage/CharacterPageCard'
import { useGetCharacterQuery } from '@app/api'

import './CharacterPage.scss'


export const CharacterPage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const queryResult = useGetCharacterQuery(Number(params.id))

  return (
    <Container className="character-page" as="main">
      <Button
        className="my-3"
        onClick={() => navigate(-1)}
        variant="outline-primary"
      >
        Назад
      </Button>
      <CharacterPageCard
        className="character-page__card"
        isLoading={queryResult.isFetching}
        data={queryResult.data}
      />
    </Container>
  )
}
