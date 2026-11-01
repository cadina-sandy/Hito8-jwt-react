import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import UserProvider from './context/UserContext.jsx'
import CartProvider from './context/CartContext.jsx'
import './styles.css'

// BrowserRouter permite usar las rutas en toda la aplicación.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Comparto el carrito y la sesión con todas las páginas. */}
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
