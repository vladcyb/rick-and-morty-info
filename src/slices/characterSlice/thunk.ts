import { createAsyncThunk } from '@reduxjs/toolkit'
import { CharacterFilter, getCharacters } from 'rickmortyapi'


import { actions } from './actions'

export const CharacterThunk = {
  getCharacters: createAsyncThunk<void, CharacterFilter | undefined>(
    'character/get',
    async (params, { dispatch }) => {
      const response = await getCharacters(params)
      dispatch(actions.set(response.data ?? []))
    },
  ),
}
