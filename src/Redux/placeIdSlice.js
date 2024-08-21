import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://api-dev.apwsolar.com/api';

export const fetchGeolocationDetails = createAsyncThunk('geolocationDetails/fetchDetails', async ({placeId}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${backendURL}/geolocation/details?placeId=${placeId}`, config);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching geolocation details:', error.message);
    throw error;
  }
});

const placeIdSlice = createSlice({
  name: 'placeIdLocation',
  initialState: {
    placedata: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeolocationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeolocationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.placedata = action.payload;
      })
      .addCase(fetchGeolocationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default placeIdSlice.reducer;
