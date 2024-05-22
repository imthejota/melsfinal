import Style from "../styles/pages/Ordenes.module.css";
import { useQuery } from "@tanstack/react-query";

const Ordenes = () => {
    const endpoint = `${import.meta.env.VITE_BACKEND}/ordenes`;
    const fetchOrdersList = async () => await (await fetch(endpoint)).json();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrdersList,
    });

    return (
        <>
            <h1>Ordenes</h1>
            {isPending && <p>Cargando lista de órdenes...</p>}
            {isError && <p>{error}</p>}
            {!isPending && !isError && (
                <ul>
                    {data.map((e) => (
                        <li>{e.customerName}</li>
                    ))}
                </ul>
            )}
        </>
    );
};
export default Ordenes;
