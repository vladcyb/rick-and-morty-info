import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Character, CharacterFilter, Info } from 'rickmortyapi'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api',
  }),
  endpoints: (builder) => ({
    getAllCharacters: builder.query<Info<Character[]>, CharacterFilter>({
      query: (filter) => `character?${new URLSearchParams(filter as Record<string, string>).toString()}`,
    }),
    getCharacter: builder.query<Character, number>({
      query: (id) => `character/${id}`,
    }),
  }),
})

export const {
  useGetAllCharactersQuery,
  useGetCharacterQuery,
} = api
