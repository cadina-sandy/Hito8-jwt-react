import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Si ya la agregué, solo le sumo una unidad.
  function agregarPizza(pizza) {
    setCart((carrito) => {
      const existe = carrito.some((item) => item.id === pizza.id);
      if (existe) {
        return carrito.map((item) =>
          item.id === pizza.id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...carrito, { ...pizza, count: 1 }];
    });
  }

  function disminuirCantidad(id) {
    // Al llegar a cero saco la pizza del pedido.
    setCart((carrito) => carrito
      .map((pizza) => pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza)
      .filter((pizza) => pizza.count > 0)
    );
  }

  // Calculo el total acá para usar el mismo en las dos partes.
  const total = cart.reduce((suma, pizza) => suma + pizza.price * pizza.count, 0);

  return (
    <CartContext.Provider value={{ cart, agregarPizza, disminuirCantidad, total }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
