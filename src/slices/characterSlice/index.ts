import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Character, Info } from 'rickmortyapi'

import { StateType } from './types'

const initialState: StateType = {
  data: {},
}

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<Info<Character[]>>) => {
      state.data = payload
    },
  },
})
