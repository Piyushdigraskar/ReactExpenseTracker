import React from "react";
import classes from './Profile.module.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Verify from "./VerifyEmail";
import {useSelector } from "react-redux";

const Profile = ()=>{

    const isProComplete = useSelector(state => state.auth.isProfileComplete);
    return <section className={classes.starting}>
        <Verify/>
        <h1>Welcome To Expense Tracker</h1>
        <section>
            
            {!isProComplete ? <h2>Your Profile is Incomplete complete it</h2> : <h2>Your Profile is complete</h2>}
            <Link to='/update'>
                Update It
            </Link>
        </section>
    </section>
}

export default Profile;