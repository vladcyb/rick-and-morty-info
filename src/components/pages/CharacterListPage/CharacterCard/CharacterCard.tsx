import clsx from 'clsx'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { Character } from 'rickmortyapi'

import { MapGenderToRussian } from '@app/shared/constants/Genders'

import './CharacterCard.scss'

interface ICharacterCardProps {
  data: Character
  className?: string
}

export const CharacterCard = ({
  data: { id, image, gender, name },
  className,
}: ICharacterCardProps) => (
  <Card className={clsx('characters-list-page-card border-0 border-md p-1 p-md-0', className)}>
    <Link to={`character/${id}`}>
      <Card.Img className="characters-list-page-card__avatar" src={image} alt={name} />
    </Link>
    <Card.Body className="characters-list-page-card__body">
      <Card.Title className="characters-list-page-card__title" as="div">
        <Link to={`character/${id}`}>{name}</Link>
      </Card.Title>
      <Card.Text>Пол: {MapGenderToRussian[gender]}</Card.Text>
      <Card.Text>Id: {id}</Card.Text>
    </Card.Body>
  </Card>
)
