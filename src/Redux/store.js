import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import itemValueReducer from './itemValuesSlice'
import getreportReducer from "./getReportSlice"
import resetPasswordReducer from "./resetPasswordSlice"
import geolocationReducer from './geoLocationSlice'
import zipcodeReducer from "./zipcodeSlice"
import autocompleteReducer from "./autocompleteSlice"
import placeIdReducer from './placeIdSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    itemValue : itemValueReducer,
    getReport : getreportReducer,
    resetPassword:resetPasswordReducer,
    geoLocation: geolocationReducer,
    zipLocation:zipcodeReducer,
    searchLocation:autocompleteReducer,
    placeIdLocation: placeIdReducer,
  }
})
export default store

