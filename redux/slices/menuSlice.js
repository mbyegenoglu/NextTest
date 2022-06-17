import { createSlice } from "@reduxjs/toolkit";

const initialState = { islogin: false };

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenu: (state, action) => {
            Object.assign(state, action.payload);
            state.islogin = true;
        }
    }
});

export const getMenu = (state) => state.menu;
export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;