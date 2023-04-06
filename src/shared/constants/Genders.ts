import { CharacterGender } from '@app/shared/types/CharacterTypes'

export const genders: CharacterGender[] = ['Male', 'Female', 'Genderless', 'unknown']

export const MapGenderToRussian: Record<CharacterGender, string> = {
  'Genderless': 'бесполый',
  'Male': 'мужской',
  'Female': 'женский',
  'unknown': 'неизвестно',
}
