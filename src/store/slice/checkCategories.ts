import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface Category {
  id: string
  name: string
  checked: boolean
  questionSets: {
    categoryId: string
    questionSets: {
      point: string | number
      count: string | number
    }[]
  }[]
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
      const { id, name, checked, questionSets } = action.payload
      const existingCategoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (existingCategoryIndex !== -1) {
        state.categoriesData[existingCategoryIndex] = { id, name, checked, questionSets }
      } else {
        state.categoriesData.push({ id, name, checked, questionSets })
      }
    },
    addSelectedCategory: (state, action: PayloadAction<Category>) => {
      const { id, name, checked, questionSets } = action.payload
      const existingCategoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (existingCategoryIndex === -1) {
        state.categoriesData.push({ id, name, checked, questionSets })
      }
    },
    removeSelectedCategory: (state, action: PayloadAction<Category>) => {
      state.categoriesData = state.categoriesData.filter((category) => category.id !== action.payload.id)
    },
    setMemberCategoires: (state, action: PayloadAction<{ code: string[]; id: string[]; checked: boolean }>) => {
      state.categoriesMember = action.payload
    },
    updatePoint: (state, action) => {
      const { id, index, value } = action.payload
      const categoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (categoryIndex !== -1 && state.categoriesData[categoryIndex].questionSets[index]) {
        state.categoriesData[categoryIndex].questionSets[index].point =
          Number(state.categoriesData[categoryIndex].questionSets[index].point) + value
      }
    },
    updateCount: (state, action) => {
      const { id, index, value } = action.payload
      const categoryIndex = state.categoriesData.findIndex((category) => category.id === id)
      if (categoryIndex !== -1 && state.categoriesData[categoryIndex].questionSets[index]) {
        state.categoriesData[categoryIndex].questionSets[index].count =
          Number(state.categoriesData[categoryIndex].questionSets[index].count) + value
      }
    },
    resetCategories: (state) => {
      state.categoriesData = initialState.categoriesData
      state.categoriesMember = initialState.categoriesMember
    }
  }
})
export const {
  setDataCategoires,
  addSelectedCategory,
  removeSelectedCategory,
  setMemberCategoires,
  updateCount,
  updatePoint,
  resetCategories
} = categoriesSlice.actions
export const categoriesReducer = categoriesSlice.reducer
