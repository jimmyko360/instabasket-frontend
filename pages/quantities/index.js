import axios from "axios";

export default function QuantitiesPage(props) {
    const { quantities } = props;
    return (
        <div>
            {quantities.results.map((quantity) => (
                <div key={quantity.id} className="flex">
                    <p>{quantity.ingredientData.name}</p>
                    <p>{quantity.quantity}</p>
                    <p>{quantity.unit}</p>
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
