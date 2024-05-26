import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuth: boolean
}

const initialState: AuthState = {
  isAuth: localStorage.getItem('token')!==null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
})

export const { setAuth } = authSlice.actions
export default authSlice.reducer