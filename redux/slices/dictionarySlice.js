import { createSlice } from "@reduxjs/toolkit";

const initialState = { islogin: false };

export const dictionarySlice = createSlice({
    name: "dictionary",
    initialState,
    reducers: {
        setDictionary: (state, action) => {
            Object.assign(state, action.payload);
            state.islogin = true;
        }
    }
});

export const getDictionary = (state) => state.dictionary;
export const { setDictionary } = dictionarySlice.actions;
export default dictionarySlice.reducer;