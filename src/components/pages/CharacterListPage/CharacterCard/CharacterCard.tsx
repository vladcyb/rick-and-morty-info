import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Character } from 'rickmortyapi'

import { MapGenderToRussian } from '@app/shared/constants/Genders'

import './CharacterCard.scss'

interface ICharacterCardProps {
  data: Character
}

export const CharacterCard = ({ data: { id, image, gender, name } }: ICharacterCardProps) => (
  <Card className="characters-list-page-card">
    <Link to={`character/${id}`}>
      <Card.Img src={image} alt={name} />
    </Link>
    <Card.Body>
      <Card.Title className="characters-list-page-card__title">
        <Link to={`character/${id}`}>{name}</Link>
      </Card.Title>
      <Card.Text>Пол: {MapGenderToRussian[gender]}</Card.Text>
      <Card.Text>Id: {id}</Card.Text>
    </Card.Body>
  </Card>
)
