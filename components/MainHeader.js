import classes from "./MainHeader.module.css";
import Link from "next/link";
import axios from "axios";

export default function MainHeader(props) {
    function logoutHandler(event) {
        event.preventDefault();
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        axios
            .post("http://localhost:8000/dj-rest-auth/logout/")
            .then((res) => {
                window.location.replace("/");
            })
            .catch((error) => {
                console.log("logout error:", error);
            });
    }
    return (
        <header>
            <p>InstaBasket</p>
            <div className={classes.login}>
                <Link href="login">Log In</Link>
                <button>Sign Up</button>
                <button onClick={logoutHandler}>Sign Out</button>
            </div>
        </header>
    );
}
