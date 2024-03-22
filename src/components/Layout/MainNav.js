import React from "react";
import classes from './MainNav.module.css'
import { Link } from "react-router-dom";
import { authActions } from "../../Store/Auth";
import { useDispatch, useSelector } from "react-redux";

const MainNav = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    
    
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return <header className={classes.header}>
        <Link to='/'>
            <div className={classes.logo}>Expense Tr@</div>
        </Link>
        <nav>
            <ul>
                {!isLoggedIn && <li>
                    <Link to='/auth'>
                        SignUp
                    </Link>
                </li>}
                {!isLoggedIn && <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>}
                {isLoggedIn && <li>
                    <Link to='/expense'>
                        Expenses
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