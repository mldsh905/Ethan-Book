import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    }
})

export const {setUser} = userSlice.actions;
export const {reducer: userReducer} = userSlice;