import Card from 'react-bootstrap/Card'
import { Character } from 'rickmortyapi'

import { MapCharacterStatusToRussian } from '@app/shared/constants/CharacterStatuses'
import { MapGenderToRussian } from '@app/shared/constants/Genders'

import './CharacterPageCard.scss'

interface ICharacterPageCard {
  isLoading: boolean
  data?: Character
}

export const CharacterPageCard = ({ isLoading, data }: ICharacterPageCard) => {
  if (isLoading) {
    return null
  }

  if (!data) {
    return <div>Ошибка.</div>
  }

  return (
    <Card className="character-page-card">
      <Card.Body className="d-flex">
        <img className="character-page-card__img" src={data.image} alt={data.name} />
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
  )
}
