import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            if (state.length > 0)
                state.splice(0, state.length);
            action.payload.forEach(e => {
                state.push(e);
            });
    }
    }
});
export const getLanguage = (state) => state.language;
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;