import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function Pizza() {
  const { agregarPizza } = useContext(CartContext);
  // Leo el id que viene en la dirección /pizza/:id.
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Cancelo la consulta anterior al salir o cambiar de pizza.
    const controller = new AbortController();
    setLoading(true);
    setPizza(null);
    setError("");

    async function cargarPizza() {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
        // Consulto el detalle de esta pizza en el backend.
        const response = await fetch(`${apiUrl}/api/pizzas/${encodeURIComponent(id.toLowerCase())}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response.status === 404 ? "No se encontró la pizza." : "No se pudo obtener la pizza.");
        }
        const data = await response.json();
        if (!data.id || !Array.isArray(data.ingredients) || typeof data.price !== "number") {
          throw new Error("La API devolvió una pizza con formato inválido.");
        }
        // El catálogo y la API usan el mismo id para compartir el carrito.
        setPizza({ ...data, id: data.id.toLowerCase() });
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error instanceof TypeError ? "No se pudo conectar con la API. Verifica que el backend esté encendido." : error.message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    cargarPizza();
    return () => controller.abort();
  }, [id]);

  // Muestro el estado de la consulta antes de dibujar el detalle.
  if (loading) return <p role="status">Cargando pizza...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!pizza) return <p>No se encontró la pizza.</p>;

  return (
    <article className="pizza-card pizza-detail">
      <img src={pizza.img} alt={`Pizza ${pizza.name}`} />
      <div className="card-content">
        <h1>Pizza {pizza.name}</h1>

        <p className="pizza-description">{pizza.desc}</p>

        <h2>Ingredientes</h2>
        <ul>
          {pizza.ingredients.map((ingrediente) => (
            <li key={ingrediente}>{ingrediente}</li>
          ))}
        </ul>

        {/* El formato es-CL muestra el separador de miles: 5950 se ve como 5.950. */}
        <h2>Precio: ${pizza.price.toLocaleString("es-CL")}</h2>
        {/* Uso el mismo carrito también en el detalle. */}
        <button type="button" className="dark-button" onClick={() => agregarPizza(pizza)}>Añadir 🛒</button>
      </div>
    </article>
  );
}

export default Pizza;
