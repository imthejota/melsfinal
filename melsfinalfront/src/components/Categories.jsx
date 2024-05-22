import { useQuery } from "@tanstack/react-query";
import Style from "../styles/components/Categories.module.css";
import useCategory from "../context/useCategory";
const Categories = () => {
  const endpoint = `${import.meta.env.VITE_BACKEND}/productos/categorias`;
  const fetchCategoryList = async () => await (await fetch(endpoint)).json();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryList,
  });

  const category = useCategory((state) => state.category);
  const setCategory = useCategory((state) => state.setCategory);
  const resetCategory = useCategory((state) => state.resetCategory);

  return (
    <>
      {isPending && <p>Cargando lista de Categorias...</p>}
      {isError && <p>{error}</p>}
      {!isPending && !isError && (
        <ul className={Style.list}>
          <li
            onClick={resetCategory}
            className={category == "all" ? Style.active : Style.item}
          >
            Todas
          </li>
          {data.map((e, i) => (
            <li
              key={i}
              onClick={() => setCategory(e)}
              className={category == e ? Style.active : Style.item}
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default Categories;
