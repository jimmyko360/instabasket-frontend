import axios from "axios";

export default function RecipesPage(props) {
    const { recipes } = props;
    return (
        <div>
            {recipes.results.map((recipe) => (
                <div key={recipe.id} className="flex">
                    <p url={recipe.url}>{recipe.name}</p>
                    <p>{recipe.last_modified}</p>
                    <p>{recipe.created_on}</p>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const token = "Token " + context.req.cookies.token;
    let recipes;

    try {
        let response = await axios.get("http://127.0.0.1:8000/recipes/", {
            headers: {
                Authorization: token,
            },
        });

        recipes = response.data;
    } catch (error) {
        // need to differentiate 401 Unauthorized error vs other errors
        console.log("http error:", error);
        return { notFound: true };
    }

    return {
        props: {
            recipes: recipes,
        },
    };
}
