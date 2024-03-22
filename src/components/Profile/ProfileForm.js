import { useRef,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React from "react";
import { authActions } from "../../Store/Auth";
import Classes from './ProfileForm.module.css';
import { useDispatch, useSelector } from "react-redux";
const ProfileForm = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const fullNameinputRef = useRef();
    const photoUrlInputRef = useRef();
    
    const history = useHistory();
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`, {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: token
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    const profile = data.users[0];
                    // Pre-fill input fields with profile data if available
                    if (profile) {
                        fullNameinputRef.current.value = profile.displayName || '';
                        photoUrlInputRef.current.value = profile.photoUrl || '';
                    }
                    
                } else {
                    console.error('Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [token]);

    const SubmitHandler = (event) => {
        event.preventDefault();
        const enteredFullName = fullNameinputRef.current.value;
        const enteredPhotoUrl = photoUrlInputRef.current.value;

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA3xAw52bOr1fcz2EABZVQ8xdEs9k_qURs`, {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: enteredFullName,
                photoUrl: enteredPhotoUrl,

                returnSecureToken: false
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json().then(data => {
                    dispatch(authActions.updateProfile(data.localId));
                    history.replace('/profile');
                    console.log('User Profile Successfully updated');
                })
            }
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