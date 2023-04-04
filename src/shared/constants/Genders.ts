import { Gender } from '@app/shared/types/CharacterTypes'

export const genders: Gender[] = ['Female', 'Male', 'Genderless', 'unknown']

export const MapGenderToRussian: Record<Gender, string> = {
  'Genderless': 'бесполый',
  'Male': 'мужской',
  'Female': 'женский',
  'unknown': 'неизвестно',
  '': '',
}
