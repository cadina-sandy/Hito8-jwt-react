function Inicio() {
  return (
    <section className="welcome-card" id="inicio">
      {/* Presentación principal de la pizzería. */}
      <p className="eyebrow">Bienvenidos</p>

      <h1>Pizzería Mamma Mía</h1>

      <p>Auténtico sabor italiano en cada porción.</p>

      {/* El emoji se oculta a lectores de pantalla porque es decorativo. */}
      <span className="welcome-icon" aria-hidden="true">
        🍕
      </span>

      {/* <h2>Inicio</h2> Se eliminó porque repetía el título principal. */}
    </section>
  )
}

export default Inicio
