import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {User} from "../../models/User";

interface userState {
  user: User
}

const initialState: userState = {
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action:PayloadAction<User>) {
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar;
    },
  },
})

export const {setUser} = userSlice.actions
export default userSlice.reducer