import { createAction } from '@reduxjs/toolkit'
import { Character } from 'rickmortyapi'

export const actions = {
  set: createAction<Character[]>('characters/set'),
}
