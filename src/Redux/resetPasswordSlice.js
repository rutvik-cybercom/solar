import { createSlice } from '@reduxjs/toolkit';
import { resetPassword } from './authAction';


const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = '';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = {};
        state.error = action.error.message;
      });
  },
});


export default resetPasswordSlice.reducer;