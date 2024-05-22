import axios from "axios";

export default function ListsListPage(props) {
    const { lists } = props;
    return (
        <div className="p-4">
            <div className="flex">
                <p className="w-1/3 font-bold">Name</p>
                <p className="w-1/3 font-bold">Updated</p>
                <p className="w-1/3 font-bold">Created</p>
            </div>
            {lists.results.map((list) => (
                <div key={list.id} className="flex">
                    <p className="w-1/3" url={list.url}>
                        {list.title}
                    </p>
                    <p className="w-1/3">{list.last_modified}</p>
                    <p className="w-1/3">{list.created_on}</p>
                </div>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const token = "Token " + context.req.cookies.token;
    let lists;

    try {
        let response = await axios.get("http://127.0.0.1:8000/lists/", {
            headers: {
                Authorization: token,
            },
        });

        lists = response.data;
    } catch (error) {
        // need to differentiate 401 Unauthorized error vs other errors
        console.log("http error:", error);
        return { notFound: true };
    }

    return {
        props: {
            lists: lists,
        },
    };
}
