import { useQuery } from "@tanstack/react-query";
import Style from "../styles/pages/Home.module.css";
import { useForm } from "react-hook-form";
import Products from "../components/Products";
import useCategory from "../context/useCategory";
import useCart from "../context/useCart";
import Cart from "../components/Cart";
const Home = () => {
  const category = useCategory((state) => state.category);
  const fetchProductsList = async (category) => {
    let endpoint = `${import.meta.env.VITE_BACKEND}/productos`;
    if (category != "all") {
      endpoint += `?category=${category}`;
    }
    return await (await fetch(endpoint)).json();
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsList(category),
  });

  return (
    <>
      <h1>Mel's</h1>
      {isPending && <p>Cargando lista de productos...</p>}
      {isError && <p>{error}</p>}
      {!isPending && !isError && <Products products={data} />}
      <Cart />
    </>
  );
};

export default Home;
