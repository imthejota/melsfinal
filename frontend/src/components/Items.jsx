import { useNavigate } from "react-router-dom";
import Style from "../styles/components/Items.module.css";
import { Ban, Check, Clock } from "lucide-react";
import { useEffect, useState } from "react";
const Items = ({ orders = [] }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [list, setList] = useState(orders);
  const completeOrder = async (orderId) => {
    try {
      const endpoint = `${import.meta.env.VITE_BACKEND}/ordenes/${orderId}`;
      let config = {};
      config.method = "PUT";
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify({ status: "complete" });
      const request = await fetch(endpoint, config);
      if (!request.ok) throw new Error("Error en la API");
      return navigate(0);
    } catch (error) {
      console.error(error.message);
    }
  };
  const rejectOrder = async (orderId) => {
    try {
      const endpoint = `${import.meta.env.VITE_BACKEND}/ordenes/${orderId}`;
      let config = {};
      config.method = "PUT";
      config.headers = { "Content-Type": "application/json" };
      config.body = JSON.stringify({ status: "reject" });
      const request = await fetch(endpoint, config);
      if (!request.ok) throw new Error("Error en la API");
      return navigate(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (orders.length == 0) {
    return (
      <section className={Style.order}>
        <h2 className={Style.orderTitle}>Ordenes</h2>
        <p className={Style.orderEmpty}> No hay ordenes en el día de hoy</p>
      </section>
    );
  }

  useEffect(() => {
    let data = orders.filter((order) => order.status == status);
    setList(data);
  }, [status]);

  return (
    <section className={Style.order}>
      <h2 className={Style.orderTitle}>Ordenes</h2>
      <form onSubmit={(e) => e.preventDefault()} className={Style.filter}>
        <button
          type="button"
          className={`${Style.btnStatus} ${
            status === "pending" ? Style.btnStatusActive : ""
          }`}
          onClick={() => setStatus("pending")}
        >
          <Clock />
        </button>
        <button
          type="button"
          className={`${Style.btnStatus} ${
            status === "complete" ? Style.btnStatusActive : ""
          }`}
          onClick={() => setStatus("complete")}
        >
          <Check />
        </button>
        <button
          type="button"
          className={`${Style.btnStatus} ${
            status === "reject" ? Style.btnStatusActive : ""
          }`}
          onClick={() => setStatus("reject")}
        >
          <Ban />
        </button>
      </form>
      {list.length == 0 && (
        <p className={Style.orderEmpty}>No hay ordenes en esta categoria</p>
      )}
      {list.length > 0 && (
        <ul className={Style.listOrders}>
          {list.map((order) => (
            <li key={order._id} className={Style.listOrdersItem}>
              <dl className={Style.listOrdersItemData}>
                <dt>Cliente:</dt>
                <dd>{order.customerName}</dd>
                <dt>Precio Final:</dt>
                <dd>${order.totalAmount}</dd>
                <dt>Metodo de Pago:</dt>
                <dd>{order.paymentMethod}</dd>
                <dt>Estado:</dt>
                <dd>{order.status}</dd>
              </dl>
              {order.status == "pending" && (
                <form
                  className={Style.listOrdersItemActions}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <button
                    type="button"
                    onClick={() => completeOrder(order._id)}
                  >
                    <Check />
                  </button>
                  <button type="button" onClick={() => rejectOrder(order._id)}>
                    <Ban />
                  </button>
                </form>
              )}

              <details className={Style.listOrdersItemProducts}>
                <summary>Productos</summary>
                <ul className={Style.listOrdersItemList}>
                  {order.products.map(({ product, quantity, price }) => (
                    <li key={product._id}>
                      <p>{product.name}</p>
                      <dl>
                        <dt>Cantidad:</dt>
                        <dd>{quantity}</dd>
                        <dt>Precio Unitario</dt>
                        <dd>${price}</dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default Items;
