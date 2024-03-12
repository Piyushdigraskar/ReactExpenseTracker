import React, { useContext } from "react";
import classes from './MainNav.module.css'
import { Link } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";

const MainNav = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () => {
        authCtx.logout();
    }

    return <header className={classes.header}>
        <Link to='/'>
            <div className={classes.logo}>Expense Tr@</div>
        </Link>
        <nav>
            <ul>
                <li>
                    <Link to='/auth'>
                        SignUp
                    </Link>
                </li>
                {!isLoggedIn && <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>}
                {isLoggedIn && <li>
                    <Link to='/profile'>
                        Profile
                    </Link>
                </li>}
                {isLoggedIn && 
                <li>
                    <button onClick={logoutHandler}>Logout</button>
                </li>
                }
            </ul>
        </nav>
    </header>
}

export default MainNav;