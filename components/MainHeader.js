import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import LoggedInHeader from "./LoggedInHeader";
import { useRouter } from "next/router";

export default function MainHeader(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

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

    async function logoutHandler(event) {
        event.preventDefault();

        try {
            await axios.post("http://localhost:8000/dj-rest-auth/logout/");
            document.cookie =
                "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setIsAuthenticated(false);
            router.push("/");
        } catch (error) {
            console.log("logout error:", error);
        }
    }

    return (
        <header className="flex justify-between">
            <Link href={"/"}>InstaBasket</Link>
            <LoggedInHeader isAuthenticated={isAuthenticated} />
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
        </header>
    );
}
