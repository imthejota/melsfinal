import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import useCart from "../context/useCart";
import Style from "../styles/components/Products.module.css";
import Categories from "./Categories";

const Products = ({ products = [] }) => {
    const items = useCart((state) => state.items);
    const update = useCart((state) => state.update);
    return (
        <section className={Style.products}>
            <Categories />
            <ul className={Style.list}>
                {products.map(({ name, category, stock, price, _id: id }) => {
                    const cartItem = items.size > 0 ? items.get(id) : null;
                    return (
                        <li key={id} className={Style.item}>
                            <h3>{name}</h3>
                            <p>{category}</p>
                            <p>${price.toFixed(2)}</p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className={Style.itemActions}
                            >
                                {!cartItem && stock > 0 && (
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
                                                update(
                                                    { id, price },
                                                    items.get(id).quantity - 1
                                                )
                                            }
                                        >
                                            <Minus />
                                        </button>
                                        <output>{cartItem.quantity}</output>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                update(
                                                    { id, price },
                                                    cartItem.quantity + 1 <= stock? cartItem.quantity + 1: cartItem.quantity
                                                )
                                            }
                                        >
                                            <Plus />
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
