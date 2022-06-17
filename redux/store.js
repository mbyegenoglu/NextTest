import { configureStore } from '@reduxjs/toolkit';

import basketReducer from './slices/basketSlice';
import dictionaryReducer from './slices/dictionarySlice';
import paramReducer from './slices/paramSlice';
import moneyReducer from './slices/moneySlice';
import userReducer from './slices/userSlice';
import menuReducer from './slices/menuSlice';
import languageReducer from './slices/languageSlice';
import listReducer from './slices/listSlice';
import linkReducer from './slices/linkSlice';

export default configureStore({
    reducer: {
        basket: basketReducer,
        dictionary: dictionaryReducer,
        param: paramReducer,
        money: moneyReducer,
        user: userReducer,
        menu: menuReducer,
        language: languageReducer,
        list: listReducer,
        link: linkReducer
    }
});