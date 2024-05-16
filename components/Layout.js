import { Fragment } from "react";
import MainHeader from "./MainHeader";

export default function Layout(props) {
    return (
        <div className="flex flex-col m-auto max-w-screen-xl">
            <MainHeader />
            <main>{props.children}</main>
        </div>
    );
}
