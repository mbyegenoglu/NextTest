import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const moneySlice = createSlice({
    name: "money",
    initialState,
    reducers: {
        setMoney: (state, action) => {
            if (state.length > 0)
                state.splice(0, state.length);
            action.payload.forEach(e => {
                state.push(e);
            });
        }
    }
});
export const getMoney = (state) => state.money;
export const { setMoney } = moneySlice.actions;
export default moneySlice.reducer;