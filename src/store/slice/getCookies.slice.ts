import { createSlice } from '@reduxjs/toolkit'

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: null,
  reducers: {
    setAccessToken: (state, action) => {
      return action.payload
    }
  }
})
export const { setAccessToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer
