import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

import { apiRequest } from "../services/api";

function Cart() {
  const { token, logout } = useContext(UserContext);
  const { cart, agregarPizza, disminuirCantidad, total } = useContext(CartContext);

  // Hito 8: envío el carrito con el JWT y confirmo la compra aceptada.
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  async function pagar() {
    if (!token || !cart.length || loading) return;
    setLoading(true);
    setMessage(null);
    try {
      await apiRequest("/api/checkouts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ cart }),
      });
      setMessage({ type: "success", text: "¡Compra realizada con éxito!" });
    } catch (error) {
      if (error.status === 401 || error.status === 403) logout();
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="cart">
      <h1>Detalles del pedido:</h1>
      <p>Revisa aqui tus pizzas.</p>

      {cart.length === 0 && <p>Tu carrito está vacío.</p>}

      {/* Pizzas del carrito. */}
      <div className="cart-items">
        {cart.map((pizza) => (
          <article className="cart-row" key={pizza.id}>
            <img src={pizza.img} alt={`Pizza ${pizza.name}`} />
            <h2>{pizza.name}</h2>

            <span>${pizza.price.toLocaleString("es-CL")}</span>

            <div className="quantity-controls">
              <button
                type="button"
                className="minus-button"
                aria-label={`Disminuir cantidad de ${pizza.name}`}
                onClick={() => disminuirCantidad(pizza.id)}
              >
                −
              </button>

              <span aria-label={`Cantidad de ${pizza.name}`}>{pizza.count}</span>

              <button
                type="button"
                className="plus-button"
                aria-label={`Aumentar cantidad de ${pizza.name}`}
                onClick={() => agregarPizza(pizza)}
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      <h2 aria-live="polite">Total: ${total.toLocaleString("es-CL")}</h2>

      {/* Sin sesión, Pagar queda deshabilitado. El pago aún es simulado. */}
      {/* <button type="button" className="dark-button" disabled={!token}>Pagar</button> */}
      {/* Hito 8: bloqueo el pago sin pizzas y mientras se envía. */}
      <button type="button" className="dark-button" disabled={!token || !cart.length || loading} onClick={pagar}>
        {loading ? "Procesando..." : "Pagar"}
      </button>
      {message && <p className={`form-message form-message--${message.type}`} role="alert">{message.text}</p>}
      {/* <p className="payment-note">{token ? "El pago estará disponible próximamente." : "Debes iniciar sesión para pagar."}</p> */}
      <p className="payment-note">{token ? "La compra se simula mediante el backend." : "Debes iniciar sesión para pagar."}</p>
    </section>
  );
}


export default Cart;
