import { configureStore } from '@reduxjs/toolkit';
import festivalSlice from '../modules/festivalSlice';
import authSlice from '../modules/authSlice';

const store = configureStore({
  reducer: {
    festivalSlice,
    auth: authSlice
  }
});

export default store;
