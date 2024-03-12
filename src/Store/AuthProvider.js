import React,{useState} from "react";

import AuthContext from "./AuthContext";

const AuthProvider = (props)=>{
    const initialToken = localStorage.getItem('token');

    const [token , setToken] = useState(initialToken);

    const userLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = ()=>{
        setToken(null);
        localStorage.removeItem('token');
    }



    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthProvider;
