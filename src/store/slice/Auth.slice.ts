// authSlice.js
import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null
  },
  reducers: {
    setToken: (state, action) => {
      console.log(state, 'táte')
      state.token = action.payload
    }
  }
})

export const { setToken } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
