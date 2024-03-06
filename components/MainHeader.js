import classes from "./MainHeader.module.css";
import axios from "axios";
import { useState } from "react";
import AuthModal from "./LoginForm";

export default function MainHeader(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeModal, setActiveModal] = useState(false);

    function showModal(event) {
        event.preventDefault();
        setActiveModal(true);
    }

    function authHandler() {
        setIsAuthenticated(true);
        setActiveModal(false);
    }

    function logoutHandler(event) {
        event.preventDefault();
        console.log(event.target.value);
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
            {activeModal && <AuthModal authHandler={authHandler} />}
            <div className={classes.login}>
                {!isAuthenticated && (
                    <button onClick={showModal}>Sign In/Register</button>
                )}
                {isAuthenticated && (
                    <button onClick={logoutHandler}>Sign Out</button>
                )}
            </div>
        </header>
    );
}
