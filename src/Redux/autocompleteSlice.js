import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendURL = 'https://api-dev.apwsolar.com/api';

export const autocompleteLocation = createAsyncThunk('geolocation/zipcode', async ({searchText}) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.get(`${backendURL}/geolocation/autocomplete?searchText=${searchText}`,config);
    return response.data.result;
  } catch (error) {
    console.error('Error geocoding location:', error.message);
    throw error;
  }
});

const autocompleteSlice = createSlice({
    name: 'searchLocation',
    initialState: {
      autodata: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(autocompleteLocation.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(autocompleteLocation.fulfilled, (state, action) => {
          state.loading = false;
          state.autodata = action.payload;
        })
        .addCase(autocompleteLocation.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default autocompleteSlice.reducer;
