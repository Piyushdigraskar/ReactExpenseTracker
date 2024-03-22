import { createSlice } from "@reduxjs/toolkit";

// token:'',
//     localId: '',
//     isProfileComplete: false,
//     isLoggedIn: false,
//     login: (token)=> {},
//     updateProfile: (localId)=>{},
//     logout :()=>{}

const initialAuthState = {
    token:localStorage.getItem('token') ||'',
    localId:localStorage.getItem('localId')||'',
    isProfileComplete: !!localStorage.getItem('localId'),
    isLoggedIn:!!localStorage.getItem('token'),
}

const authSlicer = createSlice({
    name:'auth',
    initialState: initialAuthState,
    reducers:{
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('token', action.payload.token);
        },
        updateProfile(state, action) {
            state.localId = action.payload.localId;
            state.isProfileComplete = true;
            localStorage.setItem('localId',action.payload.localId);

        },
        logout(state){
            state.token = '';
            state.localId = '';
            state.isProfileComplete = false;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('localId');
        }
    }
})

export const authActions = authSlicer.actions;
export default authSlicer.reducer;