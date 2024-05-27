import { useQuery } from "@tanstack/react-query";
import List from "../components/List";
import Create from "../components/Create";
import Style from "../styles/pages/Productos.module.css";
const Productos = () => {
  const fetchProductsList = async () => {
    let endpoint = `${import.meta.env.VITE_BACKEND}/productos`;
    return await (await fetch(endpoint)).json();
  };
  const query = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProductsList(),
  });
  const { isPending, isError, data, error } = query;

  return (
    <>
      <h1 className={Style.title}>Productos</h1>
      <section className={Style.content}>
        <List products={data} />
        <Create />
      </section>
    </>
  );
};

export default Productos;
