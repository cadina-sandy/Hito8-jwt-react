import { useContext, useState } from 'react'

import { UserContext } from '../context/UserContext'

function Login() {
  // Hito 8: envío los datos mediante el contexto y evito envíos repetidos.
  const { login } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return

    if (!email.trim() || !password) {
      setMessage({
        type: 'error',
        text: 'completa todos los campos',
      })
      return
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'Debe contener 6 caracteres',
      })
      return
    }

    // Hito 8: el mensaje de éxito solo aparece si la API acepta los datos.
    setLoading(true)
    setMessage(null)
    try {
      await login(email, password)
      setMessage({
        type: 'success',
        text: '¡Inicio de sesión exitoso!',
      })
      setEmail('')
      setPassword('')
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-card" id="login">
      <div className="form-heading">
        <p className="eyebrow">Te damos la bienvenida</p>
        <h1>Ingresar</h1>
        <p>Accede a tu cuenta de Pizzería Mamma Mía.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@correo.com"
            autoComplete="email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete="current-password"
          />
        </div>

        <button className="primary-button" type="submit" disabled={loading}>
          Ingresar
        </button>

        {message && (
          <p
            className={`form-message form-message--${message.type}`}
            role="alert"
            aria-live="polite"
          >
            {message.text}
          </p>
        )}
      </form>
    </section>
  )
}

export default Login
