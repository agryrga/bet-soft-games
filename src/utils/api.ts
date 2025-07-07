import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Game } from '../types'

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return '/pragmatic/'
  }
  return '/api/'
}

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),
  endpoints: (build) => ({
    getGames: build.query<Game[], void>({
      query: () =>
        process.env.NODE_ENV === 'development'
          ? 'game/list?partner_name=belparyaj'
          : 'games',
      transformResponse: (response?: { result: Game[] }) =>
        response?.result ?? [],
    }),
  }),
})

export const { useGetGamesQuery } = gameApi
