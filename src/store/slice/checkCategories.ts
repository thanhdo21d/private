import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const initialState = {
  categoriesData: {
    id: '',
    name: '',
    checked: false
  }
}
export const datacatgeories = createSlice({
  name: 'checkCategories',
  initialState,
  reducers: {
    setDataCategoires: (state, action: PayloadAction<{ id: string; name: string; checked: boolean }>) => {
      state.categoriesData = action.payload
    }
  }
})
export const { setDataCategoires } = datacatgeories.actions
export const categoriesReducer = datacatgeories.reducer
