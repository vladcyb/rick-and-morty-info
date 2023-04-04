import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { Link, useParams } from 'react-router-dom'
import { Character, getCharacter } from 'rickmortyapi'

import { MapGenderToRussian } from '@app/shared/constants/Genders'
import { MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'
import { Nullable } from '@app/shared/types'

import './CharacterPage.scss'

export const CharacterPage = () => {
  const [data, setData] = useState<Nullable<Character>>(null)

  const params = useParams()

  useEffect(() => {
    getCharacter(Number(params.id))
      .then((response) => {
        if (response.status === 200) {
          setData(response.data)
        }
      })
  }, [])

  return (
    <Container className="character-page" as="main">
      <Link className="my-3 d-inline-block" to="/">На главную</Link>
      {data && (
        <Card className="character-page__card">
          <Card.Body className="d-flex">
            <img className="character-page__card-img" src={data.image} alt={data.name} />
            <div className="ms-4">
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>Статус: {MapCharacterStatusToRussian[data.status]}</Card.Text>
              <Card.Text>Пол: {MapGenderToRussian[data.gender]}</Card.Text>
              <Card.Text>Локация: {data.location.name}</Card.Text>
              <Card.Text>Происхождение: {data.origin.name}</Card.Text>
              <Card.Text>Вид: {data.type}</Card.Text>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}
