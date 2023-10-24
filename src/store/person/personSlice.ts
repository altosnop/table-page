import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Person {
  id?: number;
  name: string;
  email: string;
  birthday_date: string;
  phone_number: string;
  address: string;
}

interface PersonState {
  loading: boolean;
}

const initialState: PersonState = {
  loading: false,
};

export const postPerson = createAsyncThunk(
  'person/postPerson',
  async (person: Person, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://technical-task-api.icapgroupgmbh.com/api/table/',
        person
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const putPerson = createAsyncThunk(
  'person/postPerson',
  async (person: Person) => {
    try {
      const id = person.id;
      const response = await axios.put(
        `https://technical-task-api.icapgroupgmbh.com/api/table/${id}}/`,
        {
          name: person.name,
          email: person.email,
          birthday_date: person.birthday_date,
          phone_number: person.phone_number,
          address: person.address,
        }
      );

      return response.data;
    } catch (error: any) {
      return error;
    }
  }
);

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postPerson.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(postPerson.fulfilled, (state, _) => {
      state.loading = false;
    });
    builder.addCase(postPerson.rejected, (state, _) => {
      state.loading = false;
    });
  },
});

export default personSlice.reducer;
