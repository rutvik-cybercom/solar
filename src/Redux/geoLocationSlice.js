import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://api-dev.apwsolar.com/api';

export const geoLocation = createAsyncThunk('geolocation/geocode', async ({lat,lon}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${backendURL}/geolocation/geocode?lat=${lat}&lon=${lon}`,config);

    return response.data.result[0];
  } catch (error) {
    console.error('Error geocoding location:', error.message);
    throw error;
  }
});

const geolocationSlice = createSlice({
    name: 'geoLocation',
    initialState: {
      geodata: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(geoLocation.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(geoLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.geodata = action.payload;
        })
        .addCase(geoLocation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default geolocationSlice.reducer;
