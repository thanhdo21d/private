import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  indexResult: 0
}
const showDetailResult = createSlice({
  name: 'indexResult',
  initialState,
  reducers: {
    showDetails: (state, action) => {
      state.indexResult = action.payload
    },
    hideDetails: (state, action) => {
      ;(state.status = false), (state.indexResult = action.payload)
    }
  }
})
export const { showDetails, hideDetails } = showDetailResult.actions
export const showDetailResultsReducer = showDetailResult.reducer
