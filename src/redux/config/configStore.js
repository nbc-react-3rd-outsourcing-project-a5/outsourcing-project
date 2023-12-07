import { configureStore } from '@reduxjs/toolkit';
import festivalSlice from '../modules/festivalSlice';

const store = configureStore({
  reducer: {
    festivalSlice
  }
});

export default store;
