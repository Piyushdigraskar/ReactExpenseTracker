import React, { useRef } from "react";
import classes from './Login.module.css';
import { authActions } from "../../Store/Auth";
import {  useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const Login = ()=>{
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const History = useHistory();
    
    const dispatch = useDispatch();

    

    const SubmitHandler = (event)=>{
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,
        {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true
            }),
            headers: {
              'content-type': 'application/json'
            }
          }).then(res =>{
            if(res.ok){
                return res.json().then(data =>{
                    dispatch(authActions.login(data.idToken));
                    History.replace('/profile');

                    console.log('User successfully logged in');
                })
            }else{ 
                return res.json().then((data) => {
                    let errorMessage = ' failed To Login';
                    alert(errorMessage);
                  });
            }
          }).catch(err =>{
            console.error('SomethingWrong With Response',err);
          })

          emailInputRef.current.value = '';
          passwordInputRef.current.value = '';
    }
    return (
        <section className={classes.auth}>
        <h1 >login</h1>
        <form onSubmit={SubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="email">Enter Your Email:</label>
                <input type="email" id="email" ref={emailInputRef} required></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Enter your password:</label>
                <input type="password" id="password" ref={passwordInputRef} required></input>
            </div>
            <div className={classes.actions}>
                <button>Login</button>
            </div>
        </form>
        <div className={classes.actions}>
          <Link to='/forgot'>
          <button > 
            Forgot password
          </button>
          </Link>
        </div>
    </section>
    )
}

export default Login;