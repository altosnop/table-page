import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  username: string;
  password: string;
}

interface UserState {
  status: number;
  message: string;
  loading: boolean;
  isAuthenticated: boolean;
}

interface UserPayload {
  message: string;
  status: number;
}

const initialState: UserState = {
  status: 0,
  message: '',
  loading: false,
  isAuthenticated: false,
};

export const logIn = createAsyncThunk(
  'user/logIn',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://technical-task-api.icapgroupgmbh.com/api/login/',
        user
      );

      return {
        message: response.data.message,
        status: response.status,
      };
    } catch (error: any) {
      return rejectWithValue({
        message: error.response.data.error,
        status: error.response.status,
      });
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(logIn.pending, (state, _) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(
      logIn.fulfilled,
      (state, action: PayloadAction<UserPayload>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.status = action.payload.status;
      }
    );
    builder.addCase(logIn.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.message = action.payload.message;
      state.status = action.payload.status;
    });
  },
});

export default userSlice.reducer;
