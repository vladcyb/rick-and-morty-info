import { Character } from 'rickmortyapi'

interface ICharacterCardProps {
  data: Character
}

export const CharacterCard = ({ data: { image, gender, name } }: ICharacterCardProps) => (
  <div className="character-card card">
    <img className="card-img" src={image} alt={name} />
    <div className="card-body">
      <div className="card-title fw-bold">{name}</div>
      <div>{gender}</div>
    </div>
  </div>
)
