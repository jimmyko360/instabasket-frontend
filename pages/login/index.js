import { useRef } from "react";
import axios from "axios";

export default function LoginPage(props) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    function loginHandler(event) {
        event.preventDefault();
        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;

        axios
            .post("http://localhost:8000/dj-rest-auth/login/", {
                username: username,
                password: password,
            })
            .then((response) => {
                console.log("response:", response);
                document.cookie = "token=" + response.data.key;
                console.log(document.cookie);
                window.location.replace("/");
            })
            .catch((error) => {
                console.log("login error:", error);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginHandler}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        required
                        id="username"
                        ref={usernameInputRef}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        required
                        id="password"
                        ref={passwordInputRef}
                    />
                </div>
                <div>
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
    );
}
