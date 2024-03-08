import classes from "./MainHeader.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";

export default function MainHeader(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let token;
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                while (cookie.charAt(0) == " ") {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf("token") == 0) {
                    token = cookie.substring(6);
                }
            }
            setIsAuthenticated(!!token);
        }
    }, []);

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
            <div className={classes.login}>
                {!isAuthenticated && (
                    <AuthForm setIsAuthenticated={setIsAuthenticated} />
                )}
                {isAuthenticated && (
                    <button
                        onClick={logoutHandler}
                        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                        Sign Out
                    </button>
                )}
            </div>
        </header>
    );
}
