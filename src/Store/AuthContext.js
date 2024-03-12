import React from "react";

const AuthContext = React.createContext({
    token:'',
    localId: '',
    isProfileComplete: false,
    isLoggedIn: false,
    login: (token)=> {},
    updateProfile: (localId)=>{},
    logout :()=>{}
})

export default AuthContext;