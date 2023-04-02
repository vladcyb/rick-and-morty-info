import { createAction } from '@reduxjs/toolkit'

import { StateType } from './types'

export const actions = {
  set: createAction<StateType>('characters/set'),
}
