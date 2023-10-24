import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
