import { useRef } from "react";
import axios from "axios";

export default function LoginForm(props) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    function authenticationRequest(event) {
        event.preventDefault();

        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;

        axios
            .post("http://localhost:8000/dj-rest-auth/login/", {
                username: username,
                password: password,
            })
            .then((res) => {
                document.cookie = "token=" + res.data.key;
                props.loginHandler();
            })
            .catch((error) => {
                console.log("login error:", error);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={authenticationRequest}>
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
