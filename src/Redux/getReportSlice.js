import {createSlice } from '@reduxjs/toolkit';
import { getreportValues } from './authAction';


const getreportSlice = createSlice({
  name: 'getReport',
  initialState: {
    loading: false,
    data: {},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getreportValues.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(getreportValues.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(getreportValues.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.error.message;
      });
  },
});


export default getreportSlice.reducer;
