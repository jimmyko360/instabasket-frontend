import axios from "axios";

export default function IngredientsPage(props) {
    return (
        <div>
            {props.ingredients.map((ingredient) => (
                <p key={ingredient.id}>{ingredient.name}</p>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    let ingredients = [];
    try {
        ingredients = await axios.get("http://127.0.0.1:8000/ingredients/", {
            headers: {
                Authorization: "Token " + context.req.cookies.token,
            },
        });
    } catch (error) {
        // need to differentiate 401 Unauthorized error vs other errors
        console.log("http error:", error);
        return { notFound: true };
    }

    return {
        props: {
            ingredients: ingredients.data.results,
        },
    };
}
