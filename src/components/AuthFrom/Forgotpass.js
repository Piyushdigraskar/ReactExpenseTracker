import React,{useRef} from "react";
import classes from './Forgotpass.module.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPass = ()=>{
    const emailInputRef = useRef();

    const SubmitHandler = (event)=>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,{
            method:'Post',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredEmail
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then((res) => {
            if(res.ok){
                console.log('PassWord Reset Link Sent Successfully');
            }else{
                throw new Error('Response in this case in not ok');
            }
        }).catch((err) => {
            console.error('password set link not sent',err);
        });
        emailInputRef.current.value ='';
    }

    return <section className={classes.forgot}>
        <h1>Forgot PassWord</h1>
        <form onSubmit={SubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="email">Enter the email which you have registered</label>
                <input type="email" id="email" ref={emailInputRef} required></input>
            </div>
            <div className={classes.actions}>
                <button>Send Link</button>
            </div>
                <h4>Already a user</h4>
            <div className={classes.actions}>
                <Link to='/login'>
                    <button>Login</button>
                </Link>
            </div>
        </form>
    </section>
}

export default ForgotPass;