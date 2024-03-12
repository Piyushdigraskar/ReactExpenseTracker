import React, { useContext } from "react";
import classes from './Profile.module.css';
import AuthContext from "../../Store/AuthContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ()=>{
    const authCtx = useContext(AuthContext);

    const isProComplete = authCtx.isProfileComplete;
    return <section className={classes.starting}>
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