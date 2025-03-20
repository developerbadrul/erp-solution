
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface CountryState {
    search: string;
    status: string;
    countryName: string;
    viewMode: "list" | "grid";
    itemsPerPage: number;
    currentPage: number;
}

const initialState: CountryState = {
    search: "",
    status: "all",
    countryName: "",
    viewMode: "list",
    itemsPerPage: 20,
    currentPage: 1,
}

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setCountryName: (state, action: PayloadAction<string>) => {
            state.countryName = action.payload;
        },
        setViewMode: (state, action: PayloadAction<"list" | "grid">) => {
            state.viewMode = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        resetFilters: (state) => {
            state.search = "";
            state.status = "all";
            state.countryName = "";
            state.itemsPerPage = 20;
            state.currentPage = 1;
        },
    }
})


export const { setSearch, setStatus, setCountryName, setViewMode, setItemsPerPage, setCurrentPage, resetFilters } =
    countrySlice.actions;

export default countrySlice.reducer;