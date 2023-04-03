export const CharacterStatuses = <const>['Alive', 'Dead', 'unknown']

export const MapCharacterStatusToRussian: Record<typeof CharacterStatuses[number], string> = {
  unknown: 'неизвестно',
  Alive: 'жив',
  Dead: 'мертв',
}
