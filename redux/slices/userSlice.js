import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

export const getUser = (state) => state.user;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;