import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    removeUser: (state) => {
      state.user = null
      localStorage.removeItem("userInfo")
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions

export default userSlice.reducer