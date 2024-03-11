import React from "react";
import classes from './MainNav.module.css'
import { Link } from "react-router-dom";

const MainNav = () => {
    return <header className={classes.header}>
        <Link to='/'>
            <div className={classes.logo}> Auth</div>
        </Link>
        <nav>
            <ul>
                <li>
                    <Link to='/auth'>
                        SignUp
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
}

export default MainNav;