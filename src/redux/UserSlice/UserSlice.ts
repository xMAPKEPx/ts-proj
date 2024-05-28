import { createSlice } from '@reduxjs/toolkit'

interface userState {
  user: string
}

const initialState: userState = {
  user: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = JSON.stringify(action.payload);
    },
  },
})

export const {setUser} = userSlice.actions
export default userSlice.reducer