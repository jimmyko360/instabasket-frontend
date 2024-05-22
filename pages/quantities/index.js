import axios from "axios";

export default function QuantitiesListPage(props) {
    const { quantities } = props;
    return (
        <div className="p-4">
            <div className="flex">
                <p className="font-bold w-1/2">Ingredient</p>
                <p className="font-bold w-1/4">Quantity</p>
                <p className="font-bold w-1/4">Unit</p>
            </div>
            {quantities.results.map((quantity) => (
                <div key={quantity.id} className="flex">
                    <p className="w-1/2">{quantity.ingredientData.name}</p>
                    <p className="w-1/4">{quantity.quantity}</p>
                    <p className="w-1/4">{quantity.unit}</p>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const token = "Token " + context.req.cookies.token;
    let quantities;

    try {
        let response = await axios.get("http://127.0.0.1:8000/quantities/", {
            headers: {
                Authorization: token,
            },
        });

        for (const result of response.data.results) {
            let ingredientData = await axios.get(result.ingredient, {
                headers: {
                    Authorization: token,
                },
            });
            result.ingredientData = ingredientData.data;
        }

        quantities = response.data;
    } catch (error) {
        // need to differentiate 401 Unauthorized error vs other errors
        console.log("http error:", error);
        return { notFound: true };
    }

    return {
        props: {
            quantities: quantities,
        },
    };
}
