import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { initial } from "lodash";

export interface ip_state {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ip_state = {
  value: '',
  status: 'idle'
}

export const getIP_async = createAsyncThunk(
  'get_IP_address',
  async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    return res.data.IPv4;
  }
);

const ip_adr = createSlice({
  name: 'ip_address',
  initialState: initialState, 
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getIP_async.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getIP_async.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(getIP_async.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default ip_adr.reducer;

