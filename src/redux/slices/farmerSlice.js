import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    SelectedFarmer: {
        id: '',
        name: '',
        village: '',
        Balance: 0,
    },
    SelectedFolder: {
        id: '',
        Year: '',
        Balance: 0
    },
    SelectedSubFolder: {

    }
}

const farmerSlice = createSlice({
    name: 'farmer',
    initialState,
    reducers: {
        selectFarmer: (state, action) => {
            state.SelectedFarmer.id = action.payload.id;
            state.SelectedFarmer.name = action.payload.name;
            state.SelectedFarmer.village = action.payload.village;
            state.SelectedFarmer.Balance = action.payload.Balance;
        },
        selectFolder: (state, action) => {
            state.SelectedFolder.id = action.payload.id;
            // state.SelectedFolder.Year = action.payload.year;
            // state.SelectedFolder.Balance = action.payload.Balance;
        },
        Update: (state, action) => {
            state.SelectedFarmer.Balance += action.payload.Balance;
        },
    }
});

export const { selectFarmer, selectFolder, Update } = farmerSlice.actions;
export const selectedFolderId = (state) => state.farmer.SelectedFolder.id;
export const selectedFarmerId = (state) => state.farmer.SelectedFarmer.id;
export const selectedFarmerName = (state) => state.farmer.SelectedFarmer.name;
export const selectedFarmerVillage = (state) => state.farmer.SelectedFarmer.village;
export const selectedFarmerBalance = (state) => state.farmer.SelectedFarmer.Balance;

export default farmerSlice.reducer;
