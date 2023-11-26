import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Category {
  id: string
  name: string
  checked: boolean
  inputFields: any[]
}
interface CategoriesState {
  categoriesData: Category[]
  categoriesMember: {
    code: string[]
    id: string[]
    checked: boolean
  }
}
const initialState: CategoriesState = {
  categoriesData: [],
  categoriesMember: {
    code: [],
    id: [],
    checked: false
  }
}
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setDataCategoires: (state, action: PayloadAction<Category>) => {
      const { id, name, checked, inputFields } = action.payload
      const existingCategoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (existingCategoryIndex !== -1) {
        state.categoriesData[existingCategoryIndex] = { id, name, checked, inputFields }
      } else {
        state.categoriesData.push({ id, name, checked, inputFields })
      }
    },
    addSelectedCategory: (state, action: PayloadAction<Category>) => {
      const { id, name, checked, inputFields } = action.payload
      const existingCategoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (existingCategoryIndex === -1) {
        state.categoriesData.push({ id, name, checked, inputFields })
      }
    },
    removeSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.categoriesData = state.categoriesData.filter((category) => category.id !== action.payload.id)
    },
    setMemberCategoires: (state, action: PayloadAction<{ code: string[]; id: string[]; checked: boolean }>) => {
      state.categoriesMember = action.payload
    }
  }
})

export const { setDataCategoires, addSelectedCategory, removeSelectedCategory, setMemberCategoires } =
  categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer
