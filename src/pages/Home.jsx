import Inicio from "../components/Inicio";
import CardPizza from "../components/CardPizza";
import { pizzas } from "../data/pizzas";

function Home() {
  // Mantengo las pizzas locales del hito anterior.
  return (
    <section className="home">
      <Inicio />

      {/* map crea una tarjeta por cada pizza del archivo local. */}
      <section className="pizza-grid" aria-label="Nuestras pizzas">
        {pizzas.map((pizza) => (
          <CardPizza
            key={pizza.id}
            pizza={pizza}
          />
        ))}
      </section>
    </section>
  );
}


export default Home;
