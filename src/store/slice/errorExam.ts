import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CategoriesState {
  statusError: string
}
const initialState: CategoriesState = {
  statusError: '0'
}
const updateStatusExam = createSlice({
  name: 'statusError',
  initialState,
  reducers: {
    startExam: (state) => {
      state.statusError = '0'
    },
    stopExam: (state) => {
      state.statusError = '1'
    }
  }
})
export const { startExam, stopExam } = updateStatusExam.actions
export const updateStatusExamsReducer = updateStatusExam.reducer
