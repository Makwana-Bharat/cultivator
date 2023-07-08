// setting.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Notification: false,
    BillHeading: true,
    CroplyFolder: false,
    OnboardingScreenShow: true,
};

const setting = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        HandleNotification: (state, action) => {
            state.Notification = action.payload;
        },
        HandleBillHeading: (state, action) => {
            state.BillHeading = action.payload;
        },
        HandleCroplyFolder: (state, action) => {
            state.CroplyFolder = action.payload;
        },
        HandleOnboarding: (state, action) => {
            state.OnboardingScreenShow = action.payload;
        }
    },
});

export const { HandleNotification, HandleBillHeading, HandleCroplyFolder, HandleOnboarding } = setting.actions;
export const selectNotification = (state) => state.setting.Notification;
export const selectBillHeading = (state) => state.setting.BillHeading;
export const selectCroplyFolder = (state) => state.setting.CroplyFolder;
export const checkOnboarding = (state) => state.setting.OnboardingScreenShow;
export default setting.reducer;
