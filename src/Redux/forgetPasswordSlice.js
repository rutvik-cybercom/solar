import { createSlice } from '@reduxjs/toolkit';
import { forgetPassword } from './authAction';


const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = '';
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = {};
        state.error = action.error.message;
      });
  },
});


export default forgetPasswordSlice.reducer;