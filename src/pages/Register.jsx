import { useContext, useState } from 'react'

import { UserContext } from '../context/UserContext'

function Register() {
  // Hito 8: envío los datos mediante el contexto y evito envíos repetidos.
  const { register } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return

    if (!email.trim() || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Las contraseñas no coinciden',
      })
      return
    }

    // Hito 8: el mensaje de éxito solo aparece si la API acepta los datos.
    setLoading(true)
    setMessage(null)
    try {
      await register(email, password)
      setMessage({
        type: 'success',
        text: '¡Registro exitoso! Tu cuenta fue creada correctamente.',
      })
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-card" id="registro">
      <div className="form-heading">
        <p className="eyebrow">Crea tu cuenta</p>
        <h1>Registro</h1>
        <p>Completa tus datos para comenzar.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nombre@correo.com"
            autoComplete="email"
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-password">Contraseña</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
          />
        </div>

        <div className="form-field">
          <label htmlFor="confirm-password">Confirmar contraseña</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
          />
        </div>

        <button className="primary-button" type="submit" disabled={loading}>
          Registrarme
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

export default Register
