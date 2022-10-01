import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: {
        search: '',
    },
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
        }
    }
})

export const {setSearch} = searchSlice.actions;
export const {reducer: searchReducer} = searchSlice;