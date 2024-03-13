import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import axios from "axios";

export default function AuthForm(props) {
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

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
            props.setIsAuthenticated(true);
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
        <>
            <button
                type="button"
                onClick={openModal}
                className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
                Sign In/Register
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="flex">
                                        <Dialog.Title
                                            as="h3"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={login}
                                        >
                                            Sign In
                                        </Dialog.Title>
                                        <Dialog.Title
                                            as="h3"
                                            className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={register}
                                        >
                                            Register
                                        </Dialog.Title>
                                    </div>
                                    <form onSubmit={submitHandler}>
                                        <div className="mt-2">
                                            <div>
                                                <label htmlFor="username">
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    id="username"
                                                    ref={usernameInputRef}
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="password">
                                                    Password
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    id="password"
                                                    ref={passwordInputRef}
                                                    autoComplete="off"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                                        ref={
                                                            confirmPasswordInputRef
                                                        }
                                                        autoComplete="off"
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            {!newUser && (
                                                <input
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                    value="Sign In"
                                                />
                                            )}
                                            {newUser && (
                                                <input
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                    value="Register"
                                                />
                                            )}
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
