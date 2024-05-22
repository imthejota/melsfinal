import { useForm } from "react-hook-form";
import useCart from "../context/useCart";
import { useMemo } from "react";
import Style from "../styles/components/Cart.module.css";
const Cart = () => {
  const items = useCart((state) => state.items);
  const subtotal = useMemo(
    () =>
      Array.from(items.values()).reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [items]
  );
  const { register, handleSubmit, watch, formState } = useForm({
    metodo: null,
    descuento: null,
  });
  const { errors, isSubmitting } = formState;
  const method = watch("metodo");
  const discount = watch("descuento");
  const createOrder = async (data) => {
    console.log("data", data);
    console.log("items", items);
  };
  return (
    <form onSubmit={handleSubmit(createOrder)}>
      <fieldset>
        <label htmlFor="subtotal">Subtotal</label>
        <output>${subtotal.toFixed(2)}</output>
      </fieldset>
      <fieldset className={Style.options}>
        <legend>Metodos de pago</legend>
        <label
          htmlFor="metodo-1"
          className={method == "efectivo" ? Style.active : Style.option}
        >
          Efectivo
        </label>
        <label
          htmlFor="metodo-2"
          className={method == "transferencia" ? Style.active : Style.option}
        >
          Transferencia
        </label>
        <label
          htmlFor="metodo-3"
          className={method == "mercadopago" ? Style.active : Style.option}
        >
          Mercado Pago
        </label>

        <input
          type="radio"
          id="metodo-1"
          name="metodo"
          value="efectivo"
          {...register("metodo", {
            required: { value: true, message: "Seleccione un metodo de pago" },
          })}
        />
        <input
          type="radio"
          id="metodo-2"
          name="metodo"
          value="transferencia"
          {...register("metodo", {
            required: { value: true, message: "Seleccione un metodo de pago" },
          })}
        />
        <input
          type="radio"
          id="metodo-3"
          name="metodo"
          value="mercadopago"
          {...register("metodo", {
            required: { value: true, message: "Seleccione un metodo de pago" },
          })}
        />
      </fieldset>
      {method && (method == "efectivo" || method == "transferencia") && (
        <fieldset>
          <label htmlFor="descuento">Descuento</label>
          <input
            id="descuento"
            placeholder="Descuento"
            {...register("descuento", {
              required: {
                value: true,
                message: "Ingrese el descuento",
              },
            })}
          />
        </fieldset>
      )}
      <fieldset>
        <label htmlFor="total">Total</label>
        <output>
          $
          {!discount
            ? subtotal.toFixed(2)
            : Number(subtotal - subtotal * (discount / 100)).toFixed(2)}
        </output>
      </fieldset>
      <fieldset>
        <button disabled={isSubmitting}>
          {!isSubmitting ? "Confirmar" : "Guardando"}
        </button>
      </fieldset>
    </form>
  );
};

export default Cart;
