import MainHeader from "./MainHeader";

export default function Layout(props) {
    return (
        <div className="flex flex-col m-auto max-w-screen-xl p-4">
            <MainHeader />
            <main>{props.children}</main>
        </div>
    );
}
