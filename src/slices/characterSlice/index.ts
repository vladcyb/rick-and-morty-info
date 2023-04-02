import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { StateType } from './types'

const initialState: StateType = []

export const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<any>) => { // TODO
      return payload
    },
  },
})
