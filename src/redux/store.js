import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import setting from './slices/setting'
import farmerSlice from './slices/farmerSlice'
export const store = configureStore({
    reducer: {
        userAuth: authSlice,
        setting: setting,
        farmer: farmerSlice,
    },
})