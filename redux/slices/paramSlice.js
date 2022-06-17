import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const paramSlice = createSlice({
    name: "param",
    initialState,
    reducers: {
        setParam: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

export const getParam = (state) => state.param;
export const { setParam } = paramSlice.actions;
export default paramSlice.reducer;