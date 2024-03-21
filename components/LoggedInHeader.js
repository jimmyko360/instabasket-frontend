import Link from "next/link";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

export default function LoggedInHeader(props) {
    const pages = [
        { name: "Home", link: "/" },
        { name: "Ingredients", link: "/ingredients" },
        { name: "Quantities", link: "/quantities" },
        { name: "Recipes", link: "/recipes" },
        { name: "Shopping Lists", link: "/lists" },
    ];

    const router = useRouter();
    const currentPage = pages.filter((page) => {
        return router.pathname === page.link;
    });

    const [selected, setSelected] = useState(currentPage[0]);

    function changePage(page) {
        setSelected(page);
        router.push(page.link);
    }

    return (
        <>
            {props.isAuthenticated && (
                <div className="w-36 sm:w-2/12 md:w-96">
                    <div className="sm:flex sm:justify-between hidden">
                        <Link href={"/ingredients"}>Ingredients</Link>
                        <Link href={"/quantities"}>Quantities</Link>
                        <Link href={"/recipes"}>Recipes</Link>
                        <Link href={"/lists"}>Shopping Lists</Link>
                    </div>
                    <div className="sm:hidden">
                        <Listbox value={selected} onChange={changePage}>
                            <div>
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-4 pr-4 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">
                                        {selected.name}
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="w-36 absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {pages.map((page, index) => (
                                            <Listbox.Option
                                                key={index}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                                        active
                                                            ? "bg-amber-100 text-amber-900"
                                                            : "text-gray-900"
                                                    }`
                                                }
                                                value={page}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${
                                                                selected
                                                                    ? "font-medium"
                                                                    : "font-normal"
                                                            }`}
                                                        >
                                                            {page.name}
                                                        </span>
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
            )}
        </>
    );
}
