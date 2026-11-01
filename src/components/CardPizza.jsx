import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


function CardPizza({ pizza }) {
  const { name, price, ingredients, img } = pizza;
  const { agregarPizza } = useContext(CartContext);
  return (
    <article className="pizza-card">
      <img src={img} alt={`Pizza ${name}`} />

      <div className="card-content">
        <h2>Pizza {name}</h2>
        <p>Ingredientes:</p>

        {/* Cada ingrediente tiene su propio elemento de lista. */}
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>

        <h3>Precio: ${price.toLocaleString("es-CL")}</h3>

        {/* Agrego la pizza al carrito compartido. */}
        <div className="card-buttons">
          {/* Envío el id de esta pizza a la página de detalle. */}
          <Link className="detail-link" to={`/pizza/${pizza.id.toLowerCase()}`}>Ver más 👀</Link>
          <button type="button" className="dark-button" onClick={() => agregarPizza(pizza)}>Añadir 🛒</button>
        </div>
      </div>
    </article>
  );
}


export default CardPizza;
