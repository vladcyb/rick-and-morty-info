import Card from 'react-bootstrap/Card'
import { Character } from 'rickmortyapi'

import { MapGenderToRussian } from '@app/shared/constants/Genders'

interface ICharacterCardProps {
  data: Character
}

export const CharacterCard = ({ data: { id, image, gender, name } }: ICharacterCardProps) => (
  <Card>
    <Card.Img src={image} alt={name} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        <div>Пол: {MapGenderToRussian[gender]}</div>
        <div>Id: {id}</div>
      </Card.Text>
    </Card.Body>
  </Card>
)
