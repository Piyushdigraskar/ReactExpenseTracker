import React,{useState} from "react";

import AuthContext from "./AuthContext";

const AuthProvider = (props)=>{
    const initialToken = localStorage.getItem('token');
    const initiallocalId = localStorage.getItem('localId');

    const [token , setToken] = useState(initialToken);
    const [localId , setLocalID] = useState(initiallocalId);

    const userLoggedIn = !!token;
    const isProfileComplete = !!localId;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };
    const updateProfileHandler = (localId) => {
        setLocalID(localId);
        localStorage.setItem('localId', localId);
    }

    const logoutHandler = ()=>{
        setToken(null);
        setLocalID(null);
        localStorage.removeItem('token');
    }



    const contextValue = {
        token: token,
        isProfileComplete:isProfileComplete,
        isLoggedIn: userLoggedIn,
        updateProfile: updateProfileHandler,
        login:loginHandler,
        logout:logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthProvider;
