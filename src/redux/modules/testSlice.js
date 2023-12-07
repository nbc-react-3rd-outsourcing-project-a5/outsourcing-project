// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const __test1 = createAsyncThunk('test', async (payload, thunkAPI) => {
//   try {
//     const res = await axios.get('');
//     return thunkAPI.fulfillWithValue(res);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });
// export const __test2 = createAsyncThunk('test', async (payload, thunkAPI) => {
//   try {
//     const res = await axios.get('');
//     return thunkAPI.fulfillWithValue(res);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// const initialState = {
//   isLoading: false,
//   test: []
// };

// const testSlice = createSlice({
//   name: 'test',
//   initialState,
//   reducers: {
//     test1: (state, action) => {
//       state.test = action.payload;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(__test1.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(__test1.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.test.push(action.payload);
//       })
//       .addCase(__test1.rejected, (state, action) => {
//         state.isLoading = false;
//       });
//     builder
//       .addCase(__test2.pending, (state, action) => {
//         state.isLoading = true;
//       })
//       .addCase(__test2.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.test.push(action.payload);
//       })
//       .addCase(__test2.rejected, (state, action) => {
//         state.isLoading = false;
//       });
//   }
// });

// export default testSlice.reducer;
// export const { test1 } = testSlice.actions;
