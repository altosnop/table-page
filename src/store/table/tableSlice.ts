import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Person {
  id?: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface DataPayload {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

interface TableState {
  count: number;
  next: string | null;
  previous: string | null;
  data: Person[];
  loading: boolean;
}

const initialState: TableState = {
  count: 0,
  next: null,
  previous: null,
  data: [],
  loading: false,
};

export const setTableData = createAsyncThunk(
  'table/setTableData',
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setTableData.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(
      setTableData.fulfilled,
      (state, action: PayloadAction<DataPayload>) => {
        state.loading = false;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.data = [...action.payload.results];
      }
    );
    builder.addCase(setTableData.rejected, (state, _) => {
      state.loading = false;
    });
  },
});

export default tableSlice.reducer;
