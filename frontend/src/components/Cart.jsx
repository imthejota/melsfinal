import { useForm } from "react-hook-form";
import useCart from "../context/useCart";
import Style from "../styles/components/Cart.module.css";
import { useEffect, useState } from "react";
const Cart = () => {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.reset);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const calculateSubtotal = () => {
      console.log("Entranding")
      if (items.size == 0 || items.size == undefined) {
        setSubtotal(0);
        return;
      }

      const values = Array.from(items.values());
      const reducer = (total, item) =>
        total + item.product.price * item.quantity;
      setSubtotal(values.reduce(reducer, 0));
    };

    calculateSubtotal();
  }, [items, resetCart]);

  const {
    register,
    handleSubmit,
    watch,
    formState,
    reset: resetForm,
  } = useForm({
    customerName: null,
    metodo: null,
    descuento: null,
  });
  const { errors, isSubmitting } = formState;
  const method = watch("metodo");
  const discount = watch("descuento");
  const createOrder = async (data) => {
    let order = {};
    order.customerName = data.customerName;
    order.products = Array.from(items.values());
    order.products = order.products.map((item) => ({
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    }));
    order.totalAmount = parseFloat(subtotal.toFixed(2));
    order.paymentMethod = data.metodo;
    if (data.descuento) {
      order.totalAmount = parseFloat(
        Number(subtotal - subtotal * (discount / 100)).toFixed(2)
      );
    }
    const endpoint = `${import.meta.env.VITE_BACKEND}/ordenes`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };
    try {
      const request = await fetch(endpoint, config);
      if (request.ok) {
        resetForm();
        resetCart();
        setSubtotal(0)
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(createOrder)} className={Style.cart}>
      <fieldset>
        <label htmlFor="subtotal">Subtotal</label>
        <output>${subtotal.toFixed(2)}</output>
      </fieldset>
      <fieldset>
        <label htmlFor="customer">Cliente</label>
        <input
          type="text"
          {...register("customerName", {
            required: {
              value: true,
              message: "Completar los datos del cliente",
            },
            minLength: {
              value: 4,
              message: "Completar con el nombre completo del cliente",
            },
          })}
        />
        {errors?.customerName && (
          <output className={Style.errors}>
            {errors.customerName.message}
          </output>
        )}
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
        {errors?.metodo && (
          <output className={Style.errors}>{errors.metodo.message}</output>
        )}
      </fieldset>
      {method && (method == "efectivo" || method == "transferencia") && (
        <fieldset>
          <label htmlFor="descuento">Descuento</label>
          <input
            id="descuento"
            placeholder="Descuento"
            type="number"
            min={0}
            max={100}
            step={5}
            {...register("descuento", {
              required: {
                value: true,
                message: "Ingrese el descuento",
              },
              min: {
                value: 0,
                message: "El valor minimos es 0",
              },
              max: {
                value: 100,
                message: "El valor maximo es 100",
              },
            })}
          />
          {errors?.descuento && (
            <output className={Style.errors}>{errors.descuento.message}</output>
          )}
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
