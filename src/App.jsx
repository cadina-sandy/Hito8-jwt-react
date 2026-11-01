import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Navigate, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const { token } = useContext(UserContext);
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {/* Cada dirección muestra su página. */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Con sesión activa, ingreso y registro llevan al inicio. */}
          <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/cart" element={<Cart />} />
          {/* :id permite abrir el detalle de cualquier pizza. */}
          <Route path="/pizza/:id" element={<Pizza />} />
          {/* Sin sesión, el perfil redirige al formulario de ingreso. */}
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/404" element={<NotFound />} />
          {/* El asterisco recibe las rutas que no existen. */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
