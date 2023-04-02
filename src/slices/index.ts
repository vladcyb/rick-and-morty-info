import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { characterSlice } from './characterSlice'

const store = configureStore({
  reducer: combineReducers({
    characters: characterSlice.reducer,
  }),
})

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>;

export default store
