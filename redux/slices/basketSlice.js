import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = [];

export const postBasketData = createAsyncThunk(
    'postBasket',
    async (postData, thunkAPI) => {
        const serverurl = process.env.serverurl;
        let slug = serverurl + '/Basket';
        let datares = await fetch(slug, postData);
        return await datares.json();
    }
);

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasket: (state, action) => {
            let oldLine = state.filter(m => m.variantId == action.payload.basket.variantId);
            let lastAmount = 1;
            if (oldLine.length == 0) {
                state.push(action.payload.basket);
            } else {
                if (action.payload.basket.amount == 0) {
                    state.splice(state.indexOf(oldLine[0]), 1);
                    lastAmount = 0;
                } else {
                    let nline = Object.assign({}, oldLine[0]);
                    nline.amount += action.payload.basket.amount;
                    lastAmount = nline.amount;
                    nline.price = action.payload.basket.price;
                    nline.total = nline.price * nline.amount;
                    nline.netTotal = nline.total;
                    state.splice(state.indexOf(oldLine[0]), 1, nline);
                }

            }
            
            (async () => {
                const serverurl = process.env.serverurl;
                let slug = serverurl + '/Basket';
                try {
                    const headerData = action.payload.cookies;
                    if (!!action.payload.token) {
                        headerData.Authorization = "Bearer " + action.payload.token;
                    }
                    headerData["Content-Type"] = "application/json";
                    const postData = { 
                        method: 'POST', 
                        headers: headerData, 
                        body: JSON.stringify({ProductId: action.payload.basket.productId, VariantId: action.payload.basket.variantId, PriceId: action.payload.basket.priceId, Amount: lastAmount, IsTotalAmount :action.payload.basket.IsTotalAmount }) };
                    let datares = await fetch(slug, postData);
                    await datares.json();
                } catch (error) {
                    return null;
                }
            })();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(postBasketData.fulfilled, (state, action) => {
            state.splice(0, state.length);
            state.push(...action.payload.data);
        });
      },
});
export const getBasket = (state) => state.basket;
export const { setBasket } = basketSlice.actions;
export default basketSlice.reducer;