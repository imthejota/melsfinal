import { useQuery } from "@tanstack/react-query";
import List from "../components/List";
import Create from "../components/Create"
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
      <h1>Productos</h1>
      <section>
      <List products={data} />
      <Create />
      </section>

    </>
  );
};

export default Productos;
