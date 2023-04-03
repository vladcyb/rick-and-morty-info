import Card from 'react-bootstrap/Card'
import { Character } from 'rickmortyapi'

interface ICharacterCardProps {
  data: Character
}

type Gender = Character['gender']

const genderToRussian: Record<Gender, string> = {
  Female: 'женский',
  Male: 'мужской',
  Genderless: 'бесполый',
  unknown: 'неизвестно',
}

export const CharacterCard = ({ data: { id, image, gender, name } }: ICharacterCardProps) => (
  <Card>
    <Card.Img src={image} alt={name} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        <div>Пол: {genderToRussian[gender]}</div>
        <div>Id: {id}</div>
      </Card.Text>
    </Card.Body>
  </Card>
)
