import React, { useRef } from "react";
import classes from './AuthForm.module.css';


const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const rePasswordInputRef = useRef();

    const SubmitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        const enteredRepassword = rePasswordInputRef.current.value;

        if (enteredPassword === enteredRepassword) {
            fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`,
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
                }
            ).then((res) => {
                if(res.ok){
                    console.log('User has successfully signed up');
                }
                else{
                    return res.json().then(data =>{
                        let errorMessage = 'Authentication failed';
                        alert(errorMessage);
                    })
                }
            }).catch((err) => {
                console.log('SomethingWrong With Response', err);
            });

        } else {
            console.error('Passwords Do not Match');
        }

        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        rePasswordInputRef.current.value = '';

    }
    return <section className={classes.auth}>
        <h1 >SignUp</h1>
        <form onSubmit={SubmitHandler}>
            <div className={classes.control}>
                <label htmlFor="email">Enter Your Email:</label>
                <input type="email" id="email" ref={emailInputRef} required></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Enter your password:</label>
                <input type="password" id="password" ref={passwordInputRef} required></input>
            </div>
            <div className={classes.control}>
                <label htmlFor="password">Reenter Your Password</label>
                <input type="password" id="repassword" ref={rePasswordInputRef} required></input>
            </div>
            <div className={classes.actions}>
                <button>SignUp</button>
            </div>
        </form>
    </section>
}

export default AuthForm;