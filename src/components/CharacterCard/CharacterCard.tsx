import Card from 'react-bootstrap/Card'
import { Character } from 'rickmortyapi'

interface ICharacterCardProps {
  data: Character
}

export const CharacterCard = ({ data: { image, gender, name } }: ICharacterCardProps) => (
  <Card className="character-card">
    <Card.Img src={image} alt={name} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>{gender}</Card.Text>
    </Card.Body>
  </Card>
)
