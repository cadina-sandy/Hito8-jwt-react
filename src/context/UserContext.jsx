import { createContext, useState, useCallback } from "react";

import { apiRequest } from "../services/api";

export const UserContext = createContext();

function UserProvider({ children }) {
  // Sesión simulada: al recargar comienza activa, como pide la pauta.
  // const [token, setToken] = useState(true); // Hito 7: sesión simulada.
  // Hito 8: guardo el JWT y el correo que entrega la API.
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  // Cerrar sesión actualiza todos los componentes que usan el contexto.
  // const logout = () => setToken(false); // Hito 7.
  // Hito 8: limpio ambos datos al cerrar la sesión.
  const logout = useCallback(() => {
    setToken(null);
    setEmail("");
  }, []);

  // Hito 8: ingreso y registro comparten el envío de credenciales.
  async function autenticar(ruta, email, password) {
    const data = await apiRequest(`/api/auth/${ruta}`, {
      method: "POST",
      body: JSON.stringify({ email: email.trim(), password }),
    });
    if (!data.token || !data.email) throw new Error("La API no entregó una sesión válida.");
    setEmail(data.email);
    setToken(data.token);
    return data;
  }
  const login = (email, password) => autenticar("login", email, password);
  const register = (email, password) => autenticar("register", email, password);

  // Hito 8: consulto el perfil con el JWT de la sesión.
  const obtenerPerfil = useCallback(async () => {
    try {
      const data = await apiRequest("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmail(data.email);
      return data;
    } catch (error) {
      if (error.status === 401 || error.status === 403) logout();
      throw error;
    }
  }, [token, logout]);

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, obtenerPerfil }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
