import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export default function AuthModal(props) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [newUser, setNewUser] = useState(false);

    function login() {
        setNewUser(false);
    }

    function register() {
        setNewUser(true);
    }

    async function signInUser(username, password) {
        try {
            const res = await axios.post(
                "http://localhost:8000/dj-rest-auth/login/",
                {
                    username,
                    password,
                }
            );

            document.cookie = "token=" + res.data.key;
            props.authHandler();
        } catch (error) {
            console.log("login error:", error);
        }
    }

    async function registerUser(username, password, confirmPassword) {
        try {
            await axios.post(
                "http://localhost:8000/dj-rest-auth/registration/",
                {
                    username,
                    password1: password,
                    password2: confirmPassword,
                }
            );
        } catch (error) {
            console.log("registration error:", error);
        }
    }

    async function submitHandler(event) {
        event.preventDefault();

        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordInputRef?.current?.value;

        if (newUser) {
            await registerUser(username, password, confirmPassword);
        }

        signInUser(username, password);
    }

    return (
        <div>
            <p onClick={login}>Sign In</p>
            <p onClick={register}>Register</p>
            <form onSubmit={submitHandler}>
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
                {newUser && (
                    <div>
                        <label htmlFor="confirmpassword">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            required={newUser}
                            id="confirmpassword"
                            ref={confirmPasswordInputRef}
                        />
                    </div>
                )}
                {!newUser && (
                    <div>
                        <input type="submit" value="Sign In" />
                    </div>
                )}
                {newUser && (
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                )}
            </form>
        </div>
    );
}
