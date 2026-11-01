# 🍕 Hito 8 de Pizzería Mamma Mía - Autenticación con JWT

Proyecto realizado para el desafío **Hito 8 - Pizzería Mamma Mía**, continuando el Hito 7 para implementar la autenticación real y el envío del carrito al backend.

## 📝 Descripción

En este hito conecté los formularios de ingreso y registro con el backend del material de apoyo. Ahora el contexto guarda el token JWT y el email que entrega la API para compartir la sesión entre las páginas.

También agregué la consulta del perfil del usuario autenticado y el envío del carrito de compras. Al realizar una compra correctamente, se muestra un mensaje de éxito.

Se conservan los estilos, las rutas protegidas, las validaciones y las funcionalidades de los hitos anteriores. Las líneas simuladas que se reemplazaron quedaron comentadas y los cambios nuevos tienen comentarios breves en español.

## ✨ Funcionalidades

- Registrar una cuenta mediante `POST /api/auth/register`.
- Iniciar sesión mediante `POST /api/auth/login`.
- Guardar el token JWT y el email en `UserContext`.
- Consultar el perfil mediante `GET /api/auth/me`.
- Mostrar el correo del usuario autenticado en Perfil.
- Cerrar sesión desde el Navbar y desde Perfil, limpiando el token y el email.
- Proteger Perfil y redirigir a Ingresar cuando no hay sesión.
- Redirigir al inicio si se intenta ingresar o registrar con una sesión activa.
- Mantener las validaciones de los formularios y mostrar errores de la API.
- Añadir pizzas al carrito, cambiar sus cantidades y actualizar el total.
- Enviar el carrito a `POST /api/checkouts` con el JWT en el encabezado.
- Mostrar un mensaje de éxito cuando el backend confirma la compra.
- Deshabilitar Pagar sin sesión, sin pizzas o durante el envío.
- Mantener el catálogo, el detalle de cada pizza y la página 404.

La sesión y el carrito se guardan en memoria: al recargar la página se reinician. La compra es una simulación del backend y no realiza un cobro real.

## 🛠️ Tecnologías utilizadas

- HTML5, CSS3 y JavaScript.
- React, Context API, useContext, useState, useEffect y useCallback.
- React Router, Link, useParams y Navigate.
- Fetch API y autenticación mediante JWT.
- Vite.

## 📁 Estructura del proyecto

```text
Hito8-pizzeria/
├── public/images/
├── src/
│   ├── components/
│   │   ├── CardPizza.jsx
│   │   ├── Footer.jsx
│   │   ├── Inicio.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Cart.jsx
│   │   ├── Pizza.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   ├── services/api.js
│   ├── data/pizzas.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── notas/README-anterior.md
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Cómo funciona

En `UserContext.jsx`, los métodos `login` y `register` envían el email y la contraseña al backend. Si la respuesta es correcta, guardan el token y el correo en sus estados. El método `logout` limpia ambos datos.

El método `obtenerPerfil` consulta `/api/auth/me` enviando el token como `Authorization: Bearer <token>`. La página Perfil utiliza esta consulta y muestra el correo del usuario autenticado.

En `Cart.jsx`, el botón Pagar envía un objeto `{ cart }` a `/api/checkouts` con el mismo encabezado de autorización. El mensaje de éxito aparece únicamente si la API acepta la solicitud. Si falla, se muestra el error.

`services/api.js` reúne las peticiones nuevas y utiliza `VITE_API_URL` para definir la dirección del backend.

| Ruta | Página |
| --- | --- |
| `/` | Home: listado de pizzas |
| `/register` | Registro, disponible sin sesión |
| `/login` | Ingreso, disponible sin sesión |
| `/cart` | Carrito y envío de la compra |
| `/pizza/:id` | Detalle de la pizza consultada en la API |
| `/profile` | Perfil protegido del usuario autenticado |
| `/404` | Página no encontrada |
| Cualquier otra ruta | Página no encontrada |

## 💻 Ejecutar el proyecto

### 1. Iniciar el backend

Este proyecto necesita el backend del material de apoyo, que se ejecuta por separado. Desde su carpeta, instalar las dependencias:

```bash
npm install
```

Configurar su archivo `.env` con el puerto y una clave para firmar los tokens, si todavía no están configurados:

```env
PORT=5000
JWT_SECRET=una_clave_local_para_desarrollo
```

Iniciar el backend:

```bash
npm start
```

Mantener esta terminal abierta. La API debe quedar disponible en `http://localhost:5000`.

### 2. Iniciar el frontend

Abrir otra terminal en la carpeta `Hito8-pizzeria` e instalar las dependencias:

```bash
npm install
```

Para usar otra dirección del backend, copiar `.env.example` como `.env` y modificar este valor:

```env
VITE_API_URL=http://localhost:5000
```

Iniciar la aplicación:

```bash
npm run dev
```

Abrir en el navegador la dirección que muestra Vite en la terminal. Si se cambia el archivo `.env`, reiniciar el frontend.

## ✅ Cómo verificar que funcione

Con el backend y el frontend encendidos, realizar estas pruebas:

| Paso | Qué hacer | Resultado esperado |
| --- | --- | --- |
| 1 | Sin iniciar sesión, abrir `/profile`. | La aplicación redirige a Ingresar. |
| 2 | Agregar una pizza y abrir el carrito sin sesión. | El total se actualiza y Pagar está deshabilitado. |
| 3 | Ir a Registro y enviar campos vacíos, una contraseña de menos de 6 caracteres o contraseñas distintas. | Aparece el mensaje de validación correspondiente. |
| 4 | Registrar un correo nuevo y válido, con una contraseña de al menos 6 caracteres y su confirmación. | Se crea la cuenta, se inicia sesión y se redirige al inicio. El menú muestra Perfil y Cerrar sesión. |
| 5 | Abrir Perfil. | Se muestra el mismo correo utilizado en el registro. |
| 6 | Con sesión activa, abrir `/login` o `/register`. | La aplicación redirige al inicio. |
| 7 | Cerrar sesión desde Perfil. | Se redirige a Ingresar y el menú vuelve a mostrar Ingresar y Registro. |
| 8 | Intentar ingresar con el correo registrado y una contraseña incorrecta de al menos 6 caracteres. | Aparece un error y no se inicia sesión. |
| 9 | Ingresar con el correo y la contraseña correctos. | Se inicia sesión y se redirige al inicio. |
| 10 | Agregar pizzas, cambiar cantidades y abrir el carrito. | Las cantidades y el total coinciden con el pedido. |
| 11 | Pulsar Pagar con una sesión activa y pizzas en el carrito. | Mientras se envía aparece Procesando y luego “¡Compra realizada con éxito!”. |
| 12 | Cerrar sesión desde el Navbar. | El menú cambia y Pagar vuelve a quedar deshabilitado. |
| 13 | Recargar la página. | La sesión termina y el carrito queda vacío, porque ambos estados se guardan en memoria. |

### Comprobar las peticiones al backend

Abrir las herramientas de desarrollador del navegador y entrar en **Red / Network**. Al repetir las pruebas, revisar:

- Registro e ingreso: peticiones `POST` a `/api/auth/register` y `/api/auth/login`; sus respuestas correctas contienen `token` y `email`.
- Perfil: petición `GET` a `/api/auth/me` con el encabezado `Authorization: Bearer <token>`.
- Compra: petición `POST` a `/api/checkouts` con el mismo encabezado y un cuerpo que contiene `cart` con las pizzas y sus cantidades.

### Si aparece un error

- **No se pudo conectar con el backend:** comprobar que esté encendido y que `VITE_API_URL` coincida con su dirección y puerto.
- **Correo ya registrado:** usar otro correo para probar Registro o ingresar con la cuenta existente.
- **Error de credenciales:** revisar el correo y la contraseña utilizados al registrar la cuenta.
- **Error al generar el token:** comprobar que el backend tenga configurado `JWT_SECRET` y reiniciarlo.

### Verificar la compilación

Desde la carpeta del frontend:

```bash
npm run build
```

La compilación debe terminar sin errores. Para revisar el resultado:

```bash
npm run preview
```

Abrir la dirección indicada en la terminal y repetir las pruebas principales con el backend encendido.

## 🚀 Deploy y subida del proyecto

Las carpetas `node_modules` y `dist`, y el archivo `.env`, se excluyen del repositorio. `.env.example` muestra cómo configurar la dirección de la API.

Para publicar en una subcarpeta, configurar `VITE_BASE_PATH` con su ruta antes de compilar. El alojamiento debe permitir que las rutas de la aplicación sirvan `index.html`.

La autenticación, el perfil, el detalle de las pizzas y la compra necesitan un backend accesible desde el sitio publicado. Si el frontend se publica con HTTPS, configurar una API pública con HTTPS mediante `VITE_API_URL`.

Los enlaces del Hito 7 permanecen en `notas/README-anterior.md` como referencia del proyecto anterior.

## 🔗 Repositorio

[Ver repositorio en GitHub](https://github.com/cadina-sandy/Hito8-jwt-react)

## 👩‍💻 Autora

**Sandy Cadin**
