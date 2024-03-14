import React, { useContext } from "react";
import classes from './VerifyEmail.module.css';
import AuthContext from "../../Store/AuthContext";

const Verify = ()=>{
    const authCtx = useContext(AuthContext);
    const SubmitHandler = ()=>{
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`, {
            method:'POST',
            body:JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken:authCtx.token
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then((res) => {
            if(res.ok){
                console.log('Email successfully sent for verification');
            }else{
                throw new Error('Response is not ok');
            }
        }).catch((err) => {
            console.error('Error occured during sending email',err);
        });
    }
    return <div>
        <button className={classes.action} onClick={SubmitHandler}>Verify Email</button>
    </div>
}

export default Verify;