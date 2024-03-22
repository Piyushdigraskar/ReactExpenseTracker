import { configureStore } from "@reduxjs/toolkit";

import authReducer from './Auth';
import itemReducer from './Item';

const Store = configureStore({
    reducer: {
        auth:authReducer,
        item: itemReducer
    }
})

export default Store;