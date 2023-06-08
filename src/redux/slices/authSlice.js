import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    id: null,
    detail: {},
    type: null
};

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.detail = action.payload.detail;
            state.id = action.payload.id;
            state.isLoggedIn = action.payload.isLoggedIn;
            state.type = action.payload.type;
        },
        setSignOut: (state) => {
            state.id = null;
            state.detail = null;
            state.isLoggedIn = false;
            state.type = null;
        },
        addFarmerToDetail: (state, action) => {
            state.detail = {
                ...state.detail,
                Farmer: action.payload,
            };
        },
        newFarmer: (state, action) => {
            if (state.detail.Farmer == undefined)
                state.detail.Farmer = []
            state.detail.Farmer.push(action.payload)
        },
        updateFarmer: (state, action) => {
            const { farmerId, newInfo } = action.payload;
            const farmerIndex = state.detail.Farmer.findIndex((f) => f.id === farmerId);
            state.detail.Farmer[farmerIndex].data = newInfo
        },
        deleteFarmer: (state, action) => {
            const farmerId = action.payload; // Assuming you have the farmerId passed as the payload
            const farmerIndex = state.detail.Farmer.findIndex((f) => f.id === farmerId);

            if (farmerIndex !== -1) {
                const updatedFarmers = state.detail.Farmer.filter((f) => f.id !== farmerId);
                state.detail.Farmer = updatedFarmers;
                console.log(updatedFarmers)
            }
        },
        addFolderToFarmer: (state, action) => {
            const { farmerId, folder } = action.payload;
            const farmerIndex = state.detail.Farmer.findIndex((f) => f.id === farmerId);
            if (farmerIndex !== -1) {
                state.detail.Farmer[farmerIndex] = {
                    ...state.detail.Farmer[farmerIndex],
                    Folder: folder
                };
            }
        },
        newFolder: (state, action) => {
            const { farmerId, yeardata } = action.payload;
            const farmerIndex = state.detail.Farmer.findIndex((f) => f.id === farmerId);
            if (farmerIndex !== -1) {
                if (state.detail.Farmer[farmerIndex].Folder == undefined)
                    state.detail.Farmer[farmerIndex].Folder = [];
                state.detail.Farmer[farmerIndex].Folder.push(yeardata)
            };
        },
    },
});

export const { setSignIn, setSignOut, addFarmerToDetail, addFolderToFarmer, newFarmer, newFolder, updateFarmer, deleteFarmer } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;
export const selectDetail = (state) => state.userAuth.detail;
export const selectId = (state) => state.userAuth.id;
export const selectType = (state) => state.userAuth.type;

export default authSlice.reducer;
