import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {showDarkTheme: false};

const themeSlice = createSlice({
    name:'theme',
    initialState:initialThemeState,
    reducers:{
        toggle(state){
            state.showDarkTheme = !state.showDarkTheme;
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;