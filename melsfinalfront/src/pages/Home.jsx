import { useQuery } from "@tanstack/react-query";
import Style from "../styles/pages/Home.module.css";
import useForm from "react-hook-form";

const Home = () => {
    const endpoint = `${import.meta.env.VITE_BACKEND}/productos`;
    const fetchProductsList = async () => await (await fetch(endpoint)).json();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProductsList,
    });

    const { register, handleSubmit, watch, formState } = useForm();
    const {errors, isSubmitting} = formState


    return (
        <>
            <h1>Mel's</h1>
            {isPending && <p>Cargando lista de productos...</p>}
            {isError && <p>{error}</p>}
            {!isPending && !isError && (
                <ul>
                    {data.map((e) => (
                        <li>{e.name}</li>
                    ))}
                </ul>
            )}
            <p>Subtotal: $1200</p>
            <p>Forma de pago: Cash o transferencia</p>
            <p>Cash, transfe, mp, modo, tarjeta</p>
            <p>
              Descuento se pueda poner el monto a mano y sólo habilitarse en caso de cash o transfe
            </p>
            <p>Total: $1080</p>
            <p>Cargar orden</p>
        </>
    );
};

export default Home;
