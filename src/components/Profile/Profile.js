import React from "react";
import classes from './Profile.module.css';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ()=>{
    return <section className={classes.starting}>
        <h1>Welcome To Expense Tracker</h1>
        <section>
            <h2>Your Profile is Incomplete complete it</h2>
            <Link to='/update'>
                UPdate It
            </Link>
        </section>
    </section>
}

export default Profile;