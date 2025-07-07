import { configureStore } from '@reduxjs/toolkit'
import { gameApi } from '../utils/api'
import searchReducer from './searchSlice'
import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    search: searchReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
