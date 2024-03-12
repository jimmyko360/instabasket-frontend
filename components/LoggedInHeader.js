import Link from "next/link";

export default function LoggedInHeader(props) {
    return (
        <>
            {props.isAuthenticated && (
                <div className="flex w-2/12 justify-between">
                    <Link href={"/ingredients"}>Ingredients</Link>
                    <Link href={"/quantities"}>Quantities</Link>
                    <Link href={"/recipes"}>Recipes</Link>
                    <Link href={"/lists"}>Shopping Lists</Link>
                </div>
            )}
        </>
    );
}
