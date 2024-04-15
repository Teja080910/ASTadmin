import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  admin: ""
}
export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    user: (state, action) => {
      state.admin = action.payload
    }
  },
})
export const { user } = counterSlice.actions

export default counterSlice.reducer