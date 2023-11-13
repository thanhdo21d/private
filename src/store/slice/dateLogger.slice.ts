import { PayloadAction, createSlice } from '@reduxjs/toolkit'
const initialState = {
  loggerData: {
    key: '',
    user: '',
    contents: '',
    ipAddress: [],
    logType: '',
    createdAt: ''
  },
  id: '',
  loggerDate: {
    startDate: '',
    endDate: ''
  }
}
export const dateLogger = createSlice({
  name: 'loggers',
  initialState,
  reducers: {
    setLoggerDate: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      state.loggerDate = action.payload
    }
  }
})
export const { setLoggerDate } = dateLogger.actions
export const loggersReducer = dateLogger.reducer
