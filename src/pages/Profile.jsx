import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
  const { email, logout, obtenerPerfil } = useContext(UserContext);
  // Hito 8: obtengo el correo del perfil autenticado al abrir esta página.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    obtenerPerfil()
      .catch((error) => { if (active) setError(error.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [obtenerPerfil]);
  return (
    <section className="form-card">
      <h1>Mi perfil</h1>
      {/* <p>Email: sandy@cadin.com</p> */}
      {/* Hito 8: muestro el correo real y el estado de la consulta. */}
      <p>Email: {email}</p>
      {loading && <p role="status">Cargando perfil...</p>}
      {error && <p role="alert">{error}</p>}
      <button type="button" className="primary-button" onClick={logout}>Cerrar sesión</button>
    </section>
  );
}

export default Profile;
