import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://api-dev.apwsolar.com/api';

export const zipCodeLocation = createAsyncThunk('geolocation/zipcode', async ({zipcode,lat,lon}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${backendURL}/geolocation/geocode?zipCode=${zipcode}&lat=${lat}&lon=${lon}`,config);
    return response.data.result[0];
  } catch (error) {
    console.error('Error geocoding location:', error.message);
    throw error;
  }
});

const zipcodeSlice = createSlice({
    name: 'zipLocation',
    initialState: {
      zipdata: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(zipCodeLocation.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(zipCodeLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.zipdata = action.payload;
        })
        .addCase(zipCodeLocation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default zipcodeSlice.reducer;
