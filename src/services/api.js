// Hito 8: uso la misma dirección configurable para las peticiones nuevas.
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export async function apiRequest(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new Error("No se pudo conectar con el backend. Revisa que esté iniciado.");
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || data.message || "No se pudo completar la solicitud.");
    error.status = response.status;
    throw error;
  }
  return data;
}
