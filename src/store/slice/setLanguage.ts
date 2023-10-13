import { createSlice } from '@reduxjs/toolkit'

const fetchProfileAccount = createSlice({
  name: 'profileAccount',
  initialState: {
    language: 'VN' as any
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    }
  }
})
export const { setLanguage } = fetchProfileAccount.actions

export default fetchProfileAccount
