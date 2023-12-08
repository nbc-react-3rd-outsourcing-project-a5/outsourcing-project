import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db } from 'fb/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const __getUsers = createAsyncThunk('getUsers', async (userId, thunkAPI) => {
  try {
    const docRef = doc(db, 'user', userId);
    const docSnap = await getDoc(docRef);
    return thunkAPI.fulfillWithValue(docSnap);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: null,
    targetUser: null
  },
  reducers: {
    checkLogin: (state, action) => {
      state.users = action.payload;
    },
    login: (state, action) => {
      state.users = action.payload;
    },
    logout: (state, action) => {
      state.users = null;
    }
  }
});

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;
