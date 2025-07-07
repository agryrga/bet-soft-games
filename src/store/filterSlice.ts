import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  selectedType: string
}

const initialState: FilterState = {
  selectedType: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.selectedType = action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
