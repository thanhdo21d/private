import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const initialState = {
  categoriesData: {
    id: '',
    name: '',
    checked: false
  },
  categoriesMember: {
    code: [] as string[],
    id: [] as string[],
    checked: false
  }
}
export const datacatgeories = createSlice({
  name: 'checkCategories',
  initialState,
  reducers: {
    setDataCategoires: (state, action: PayloadAction<{ id: string; name: string; checked: boolean }>) => {
      state.categoriesData = action.payload
    },
    setMemberCategoires: (state, action: PayloadAction<{ code: string[]; id: string[]; checked: boolean }>) => {
      state.categoriesMember = action.payload
    }
  }
})
export const { setDataCategoires, setMemberCategoires } = datacatgeories.actions
export const categoriesReducer = datacatgeories.reducer
