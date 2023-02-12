import { configureStore } from '@reduxjs/toolkit'
import OnlineStoreSlice from './OnlineStoreSlice'

export const store = configureStore({
  reducer: {OnlineStoreSlice}
})