// authSlice.js
import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      username: '',
      avatar: '',
      code: '',
      email: '',
      address: '',
      role: '',
      employeeCode: '',
      accessToken: '',
      refreshToken: ''
    }
  },
  reducers: {
    setToken: (state, action) => {
      console.log(state, 'táte')
      // state.token = action.payload
    },
    refreshUser: (state, { payload }) => {
      state.user = payload
    }
  }
})

export const { setToken , refreshUser } = authSlice.actions
const authReducer = authSlice.reducer
export default authReducer
