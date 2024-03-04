import classes from "./MainHeader.module.css";
import axios from "axios";
import { useState } from "react";
import LoginForm from "./LoginForm";

export default function MainHeader(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    function showLoginForm(event) {
        event.preventDefault();
        setShowLogin(true);
    }

    function loginHandler() {
        setIsAuthenticated(true);
        setShowLogin(false);
    }

    function logoutHandler(event) {
        event.preventDefault();
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        axios
            .post("http://localhost:8000/dj-rest-auth/logout/")
            .then((res) => {
                setIsAuthenticated(false);
            })
            .catch((error) => {
                console.log("logout error:", error);
            });
    }

    return (
        <header>
            <p>InstaBasket</p>
            {showLogin && <LoginForm loginHandler={loginHandler} />}
            <div className={classes.login}>
                {!isAuthenticated && (
                    <button onClick={showLoginForm}>Sign In</button>
                )}
                <button>Sign Up</button>
                {isAuthenticated && (
                    <button onClick={logoutHandler}>Sign Out</button>
                )}
            </div>
        </header>
    );
}
