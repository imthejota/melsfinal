import Items from "../components/Items";
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
      {isPending && <p>Cargando lista de órdenes...</p>}
      {isError && <p>{error}</p>}
      {!isPending && !isError && <Items orders={data} />}
    </>
  );
};
export default Ordenes;
