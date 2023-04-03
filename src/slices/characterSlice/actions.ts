import { createAction } from '@reduxjs/toolkit'
import { Character, Info } from 'rickmortyapi'

export const actions = {
  set: createAction<Info<Character[]>>('characters/set'),
}
