export const characterStatuses = <const>['Alive', 'Dead', 'unknown']

export const MapCharacterStatusToRussian: Record<typeof characterStatuses[number], string> = {
  unknown: 'неизвестно',
  Alive: 'жив',
  Dead: 'мертв',
}
