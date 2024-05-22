import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import useCart from "../context/useCart";
import Style from "../styles/components/Products.module.css";
import Categories from "./Categories";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Products = ({ products }) => {
  const items = useCart((state) => state.items);
  const update = useCart((state) => state.update);
  return (
    <section>
      <Categories />
      <ul>
        {products.map(({ name, category, price, _id: id }) => {
          const cartItem = items.size > 0 ? items.get(id) : null;
          return (
            <li key={id}>
              <h3>{name}</h3>
              <p>{category}</p>
              <p>${price}</p>
              <form onSubmit={(e) => e.preventDefault()}>
                {!cartItem && (
                  <button
                    type="button"
                    onClick={() => update({ id, price }, 1)}
                  >
                    <Plus />
                  </button>
                )}
                {cartItem && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        update({ id, price }, cartItem.quantity + 1)
                      }
                    >
                      <Plus />
                    </button>

                    <output>{cartItem.quantity}</output>

                    <button
                      type="button"
                      onClick={() =>
                        update({ id, price }, items.get(id).quantity - 1)
                      }
                    >
                      <Minus />
                    </button>
                  </>
                )}
              </form>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Products;
