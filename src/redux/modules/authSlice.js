import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, db } from 'fb/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export const __getUsers = createAsyncThunk('getUsers', async (userId, thunkAPI) => {
  try {
    const res = await getDocs(collection(db, 'user'));
    const data = res.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __targetUser = createAsyncThunk('targetUser', async (payload, thunkAPI) => {
  try {
    const userProfile = await thunkAPI.dispatch(__getUsers());
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userEmail = user.email;
        const selectUser = userProfile.payload?.find((i) => userEmail === i.email);
        if (selectUser) {
          thunkAPI.dispatch(checkLogin(selectUser));
          // thunkAPI.fulfillWithValue(selectUser);
        }
      }
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    users: null,
    targetUser: null,
    isLoading: false
  },
  reducers: {
    checkLogin: (state, action) => {
      state.targetUser = action.payload;
    },
    login: (state, action) => {
      state.users = action.payload;
    },
    logout: (state, action) => {
      state.targetUser = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(__getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(__getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder
      .addCase(__targetUser.pending, (state) => {
        state.isLoading = true;
      })
      // .addCase(__targetUser.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.users = action.payload;
      // })
      .addCase(__targetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  }
});

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;
