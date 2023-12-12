import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CategoriesState {
  count: number
  examsData: any[]
}
const initialState: CategoriesState = {
  examsData: [],
  count: 0
}
const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.count = state.count + 1
    },
    decrementCount: (state) => {
      if (state.count > 0) {
        state.count = state.count - 1
      }
    },
    setExamsData: (state, action: PayloadAction<any[]>) => {
      state.examsData = action.payload
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload
    }
  }
})
export const { incrementCount, decrementCount, setExamsData, setCount } = examSlice.actions
export const examsReducer = examSlice.reducer
