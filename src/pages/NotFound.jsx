import { Link } from "react-router";

function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">Pizzería Mamma Mía</p>
      {/* La pizza ocupa el lugar del cero y le falta una porción. */}
      <h1 className="pizza-error" aria-label="Error 404">
        <span aria-hidden="true">4</span>
        <span className="missing-pizza" aria-hidden="true">
          <span className="pepperoni pepperoni-one" />
          <span className="pepperoni pepperoni-two" />
          <span className="pepperoni pepperoni-three" />
          <span className="pepperoni pepperoni-four" />
        </span>
        <span aria-hidden="true">4</span>
      </h1>
      <p className="pizza-label">ERROR 404 · PORCIÓN NO ENCONTRADA</p>
      <h2>¡Alguien se comió esta página!</h2>
      <p className="not-found-message">
        Aquí solo quedaron las ganas de pizza.<br />
        Vuelve al inicio, todavía hay mucho por probar.
      </p>
      {/* El enlace vuelve a la página principal sin recargar. */}
      <Link className="primary-button back-home" to="/">Volver al inicio 🍕</Link>
    </section>
  );
}

export default NotFound;
