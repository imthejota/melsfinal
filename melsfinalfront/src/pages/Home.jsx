import { useQuery } from "@tanstack/react-query";
import Style from "../styles/pages/Home.module.css";
import Products from "../components/Products";
import useCategory from "../context/useCategory";
import Cart from "../components/Cart";
const Home = () => {
  const category = useCategory((state) => state.category);
  const fetchProductsList = async (category) => {
    let endpoint = `${import.meta.env.VITE_BACKEND}/productos`;
    if (category != "all") {
      endpoint += `?category=${category}`;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return await (await fetch(endpoint)).json();
  };
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsList(category),
  });

  return (
    <>
      <h1 className={Style.title}>Mel's</h1>
      {isPending && (
        <p className={Style.loading}>Cargando lista de productos...</p>
      )}
      {isError && <p className={Style.error}>{error}</p>}
      {!isPending && !isError && (
        <section className={Style.content}>
          <Products products={data} />
          <Cart />
        </section>
      )}
    </>
  );
};

export default Home;
