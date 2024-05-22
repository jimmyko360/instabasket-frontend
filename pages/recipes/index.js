import axios from "axios";

export default function RecipesListPage(props) {
    const { recipes } = props;
    return (
        <div className="p-4">
            <div className="flex">
                <p className="w-1/3 font-bold">Name</p>
                <p className="w-1/3 font-bold">Updated</p>
                <p className="w-1/3 font-bold">Created</p>
            </div>
            {recipes.results.map((recipe) => (
                <div key={recipe.id} className="flex">
                    <p className="w-1/3" url={recipe.url}>
                        {recipe.name}
                    </p>
                    <p className="w-1/3">{recipe.last_modified}</p>
                    <p className="w-1/3">{recipe.created_on}</p>
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
