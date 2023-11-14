import { createSlice } from '@reduxjs/toolkit'

const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: null,
  reducers: {
    setAccessToken: (state, action) => {
      console.log(state)
      return action.payload
    }
  }
})
export const { setAccessToken } = accessTokenSlice.actions

export default accessTokenSlice.reducer
