import Style from "../styles/components/Items.module.css";
const Items = ({ orders = [] }) => {
  if (orders.length == 0) {
    return (
      <section>
        <h2>No hay ordenes del dia</h2>
      </section>
    );
  }
  return (
    <section>
      <h2>Ordenes</h2>
      <ul>
        {orders.map((order) => (
          <li>
            <dl>
              <dt>Cliente:</dt>
              <dd>{order.customerName}</dd>
              <dt>Precio Final:</dt>
              <dd>{order.totalAmount}</dd>
              <dt>Estado:</dt>
              <dd>{order.status}</dd>
            </dl>
            <details>
              <summary>Productos</summary>
              <ul>
                {order.products.map(({ product, quantity, price }) => (
                  <li>
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
    </section>
  );
};
export default Items;
