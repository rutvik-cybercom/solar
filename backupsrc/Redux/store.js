import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import itemValueReducer from './itemValuesSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    itemValue : itemValueReducer
  }
})
export default store

