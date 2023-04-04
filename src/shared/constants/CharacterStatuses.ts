import { CharacterStatus } from '@app/shared/types/CharacterTypes'

export const characterStatuses: CharacterStatus[] = ['Alive', 'Dead', 'unknown']

export const MapCharacterStatusToRussian: Record<CharacterStatus, string> = {
  unknown: 'неизвестно',
  Alive: 'жив',
  Dead: 'мертв',
}
