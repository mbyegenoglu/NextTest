import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        setList: (state, action) => {
            if (state.length > 0)
                state.splice(0, state.length);
            action.payload.forEach(e => {
                state.push(e);
            });
    }
    }
});
export const getList = (state) => state.list;
export const { setList } = listSlice.actions;
export default listSlice.reducer;