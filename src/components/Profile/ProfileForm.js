import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import React from "react";
import AuthContext from "../../Store/AuthContext";
import Classes from './ProfileForm.module.css';
const ProfileForm = () => {
    const authCtx = useContext(AuthContext);
    const fullNameinputRef = useRef();
    const photoUrlInputRef = useRef();

    const history = useHistory();

    const SubmitHandler = (event) => {
        event.preventDefault();
        const enteredFullName = fullNameinputRef.current.value;
        const enteredPhotoUrl = photoUrlInputRef.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`, {
            method: 'POST',
            body: JSON.stringify({
                idToken:authCtx.token,
                displayName: enteredFullName,
                photoUrl: enteredPhotoUrl,

                returnSecureToken:false
            }),
            headers:{
                'content-type':'application/json'
            }
        }).then(res =>{
            history.replace('/profile');
            console.log('User Profile Successfully updated');
        })
        fullNameinputRef.current.value = '';
        photoUrlInputRef.current.value = '';
    }

    return <section className={Classes.sec} >
        <h1>Contact Details</h1>
        <form className={Classes.form} onSubmit={SubmitHandler}>
            <div className={Classes.control}>
                <label htmlFor="full-name">Full Name:</label>
                <input type="text" id="name" ref={fullNameinputRef} required></input>
            </div>
            <div className={Classes.control}>
                <label htmlFor="photo">Photo Url:</label>
                <input type="text" id="photo" ref={photoUrlInputRef} required></input>
            </div>
            <div className={Classes.action}>
                <button>Update</button>
            </div>
        </form>
    </section>

}

export default ProfileForm;