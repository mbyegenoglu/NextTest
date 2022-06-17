import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {
        setLink: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});
export const getLink = (state) => state.link;
export const { setLink } = linkSlice.actions;
export default linkSlice.reducer;