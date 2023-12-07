import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    checkLogin: (state, action) => {
      state.user = action.payload[0];
    },
    login: (state, action) => {
      state.user = action.payload;
      // console.log(action.payload);
    },
    logout: (state, action) => {
      state.user = null;
    }
  }
});

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;
