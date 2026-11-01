import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router";

function Navbar() {
  const { total } = useContext(CartContext);
  // Hito 8: este logout ahora limpia el JWT y el correo reales.
  const { token, logout } = useContext(UserContext);
  return (
    <header className="site-header">
      <span className="brand">🍕 Pizzería Mamma Mía</span>
      {/* Link cambia de página sin recargar el sitio. */}
      <nav aria-label="Navegación principal">
        <Link to="/">Inicio</Link>
        {/* El token decide qué opciones de sesión mostrar. */}
        {token ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button type="button" onClick={logout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Ingresar</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        <Link to="/404">404</Link>
        <Link to="/cart">🛒 Total: ${total.toLocaleString("es-CL")}</Link>
      </nav>
    </header>
  );
}

export default Navbar;
