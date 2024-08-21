import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchitemValues } from './authAction';



const itemValueSlice = createSlice({
  name: 'itemValue',
  initialState: {
    loading: false,
    data: {},
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchitemValues.pending, (state) => {
        state.loading = true;
      })
      builder
      .addCase(fetchitemValues.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg === 0) {
          state.coolingData  = action.payload;
        } else if (action.meta.arg === 1) {
          state.heatingData  = action.payload;
        }else if (action.meta.arg===4){
          state.energyProviderData=action.payload
        }
        state.error = '';
      })
      .addCase(fetchitemValues.rejected, (state, action) => {
        state.loading = false;
        state.data = {};
        state.error = action.error.message;
      });
  },
});


  

export default itemValueSlice.reducer;
