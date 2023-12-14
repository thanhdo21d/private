import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface CategoriesState {
  count: number
  examsData: any[]
  submitData: any
}
const initialState: CategoriesState = {
  examsData: [],
  count: 0,
  submitData: []
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
    },
    updateSubmitData: (state, action: PayloadAction<{ counts: number; chooses: string }>) => {
      const { counts, chooses } = action.payload
      console.log(counts, chooses)
      const newData = [...state.submitData]
      if (newData[counts] === undefined) {
        newData[counts] = [chooses]
      } else if (!newData[counts].includes(chooses)) {
        newData[counts].push(chooses)
      } else if (newData[counts].includes(chooses)) {
        newData[counts] = newData[counts].filter((item: any) => item !== chooses)
      }
      state.submitData = newData
    }
  }
})
export const { incrementCount, decrementCount, setExamsData, setCount, updateSubmitData } = examSlice.actions
export const examsReducer = examSlice.reducer
