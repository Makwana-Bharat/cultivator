// setting.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Notification: false,
    BillHeading: true,
    CroplyFolder: true,
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
    },
});

export const { HandleNotification, HandleBillHeading, HandleCroplyFolder } = setting.actions;
export const selectNotification = (state) => state.setting.Notification;
export const selectBillHeading = (state) => state.setting.BillHeading;
export const selectCroplyFolder = (state) => state.setting.CroplyFolder;
export default setting.reducer;
