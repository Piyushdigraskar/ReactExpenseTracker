import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Auth';
import itemReducer from './Item';
import themeReducer from './Theme';

const Store = configureStore({
    reducer: {
        auth:authReducer,
        item: itemReducer,
        theme: themeReducer
    }
})

export default Store;