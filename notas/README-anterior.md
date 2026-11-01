# Hito 8 - Pizzería Mamma Mía

Continuación del Hito 7 con autenticación real mediante JWT. El original se conserva en su carpeta y las líneas simuladas reemplazadas quedaron comentadas.

## Ejecutar

1. Inicia el backend del material de apoyo en `http://localhost:5000` (con su `JWT_SECRET` configurado).
2. Ejecuta `npm install` y `npm run dev` en esta carpeta.
3. Regístrate con un correo válido y una contraseña de al menos 6 caracteres, o ingresa con una cuenta existente.
4. Abre Perfil para consultar el correo autenticado. Agrega pizzas y pulsa Pagar para simular la compra.

`VITE_API_URL` permite cambiar el backend. La sesión se guarda en memoria y se cierra al recargar. Para publicar en una subcarpeta, configura `VITE_BASE_PATH` antes de compilar. Los enlaces de despliegue de la documentación anterior corresponden al Hito 7.

## Pauta completada

1. `UserContext`: login y register consultan la API y guardan token y email.
2. Logout elimina ambos estados.
3. `obtenerPerfil` consulta `/api/auth/me` con Bearer JWT.
4. Login y Register usan el contexto, conservando sus validaciones.
5. Profile muestra el email real y permite cerrar sesión.
6. El botón del Navbar utiliza el logout del contexto.
7. Cart envía `{ cart }` a `POST /api/checkouts` con JWT.
8. Cart muestra éxito únicamente después de una respuesta correcta.

Se agregaron comentarios breves en español en el código nuevo y mensajes de carga y error. La compra es una simulación del backend, no un cobro real.

## Verificación realizada

Compilación de producción correcta y pruebas en Chrome contra una copia del backend de apoyo: ruta protegida, registro, perfil, cierre de sesión desde perfil y navbar, contraseña incorrecta, ingreso y checkout exitoso. No se modificaron los datos del backend original.

---

## Documentación conservada del Hito 7

# 🍕 Hito 7 de Pizzería Mamma Mía - React Router II

Proyecto realizado para el desafío **Hito 7 - Pizzería Mamma Mía**, continuando el Hito 6 para agregar rutas protegidas y consultar el detalle de cada pizza con React Router.

## 🚀 Deploy

[Ver sitio web en GitHub Pages](https://cadina-sandy.github.io/Hito7-router2-react/)

GitHub Actions compila el proyecto con Vite y publica el resultado en Pages al subir cambios a `main`. Las rutas publicadas comienzan con `/Hito7-router2-react/`.

El inicio y el carrito funcionan en la web publicada. El detalle de las pizzas necesita conectarse al backend del material de apoyo. Para consultarlo desde internet, se debe configurar una API pública con HTTPS mediante `VITE_API_URL` al compilar. Mientras no se configure, el detalle muestra un error si el backend local no está disponible.

## 📝 Descripción

En este hito agregué un contexto para compartir el estado de la sesión entre las páginas. Ahora el menú cambia según el token simulado y el perfil solo se puede visitar cuando la sesión está activa.

También agregué enlaces para ver el detalle de cada pizza. La página obtiene el id desde la dirección y consulta la API para mostrar su información.

Se conservan los estilos, los formularios y el carrito de los hitos anteriores, con comentarios básicos en español para explicar los cambios.

## ✨ Funcionalidades

- Navegar con los enlaces del Navbar usando `Link`.
- Abrir el carrito desde el botón del total.
- Mostrar el listado de pizzas desde el archivo local `src/data/pizzas.js`.
- Abrir el detalle de cada pizza desde el enlace Ver más.
- Obtener el id de la pizza con `useParams` y consultar `GET /api/pizzas/:id`.
- Mostrar la descripción, ingredientes y precio de la pizza consultada.
- Mostrar mensajes de carga y error al consultar la API.
- Compartir el token simulado mediante `UserContext`.
- Mostrar Perfil y Cerrar sesión cuando el token es `true`.
- Mostrar Ingresar y Registro cuando el token es `false`.
- Mantener Inicio y Total siempre visibles.
- Cerrar la sesión desde el Navbar o desde el perfil.
- Redirigir a Ingresar al intentar visitar el perfil sin sesión.
- Redirigir al inicio al intentar visitar Ingresar o Registro con sesión activa.
- Deshabilitar el botón Pagar cuando no hay sesión.
- Conservar los formularios de registro e ingreso con sus validaciones.
- Añadir pizzas al carrito desde el inicio y desde el detalle.
- Aumentar y disminuir cantidades, eliminar pizzas y actualizar el total compartido.
- Mostrar una página 404 con una pizza hecha en CSS y un enlace para volver al inicio.

El token comienza en `true` y el carrito comienza vacío. Ambos se reinician al recargar la página. La sesión es simulada: los formularios todavía no generan tokens. El botón Pagar no procesa pagos.

## 🛠️ Tecnologías utilizadas

- HTML5, CSS3 y JavaScript.
- React, Context API, useContext, useState y useEffect.
- React Router, useParams y Navigate.
- Fetch API.
- Vite.

## 📁 Estructura del proyecto

```text
Hito7-pizzeria/
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
│   ├── data/pizzas.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Cómo funciona

En `UserContext.jsx` guardé el token con `useState`, inicialmente en `true`. La función `logout` lo cambia a `false`. En `main.jsx`, `UserProvider` envuelve la aplicación para compartir estos datos con el Navbar, el carrito, el perfil y las rutas.

En `App.jsx`, las rutas revisan el token y usan `Navigate` para redirigir cuando corresponde. Si no hay sesión, el perfil lleva a `/login`. Si hay sesión, las páginas de ingreso y registro llevan al inicio.

En `Pizza.jsx`, `useParams` obtiene el id de la dirección. Con ese id hago una petición al backend usando `fetch`. La consulta se actualiza cuando cambia el id y muestra un mensaje si la pizza no existe o la API no está disponible.

`CartContext.jsx` mantiene el carrito compartido del Hito 6. Las pizzas usan el mismo id en el catálogo y en el detalle para sumar sus cantidades sin duplicarlas.

| Ruta | Página |
| --- | --- |
| `/` | Home: listado de pizzas |
| `/register` | Register: formulario de registro, disponible sin sesión |
| `/login` | Login: formulario de ingreso, disponible sin sesión |
| `/cart` | Cart: carrito de compras y botón Pagar según la sesión |
| `/pizza/:id` | Pizza: detalle de la pizza consultada en la API |
| `/profile` | Profile: perfil protegido y botón para cerrar sesión |
| `/404` | NotFound: página no encontrada |
| Cualquier otra ruta | NotFound |

Por ejemplo, el enlace Ver más de la pizza napolitana abre `/pizza/p001` y consulta `http://localhost:5000/api/pizzas/p001`.

## 💻 Ejecutar el proyecto

En la carpeta del proyecto, instalar las dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm run dev
```

En otra terminal, desde la carpeta del backend del material de apoyo, instalar sus dependencias e iniciarlo:

```bash
npm install
npm start
```

La API debe estar disponible en `http://localhost:5000`. Para usar otra dirección, copiar `.env.example` como `.env`, modificar `VITE_API_URL` y reiniciar Vite.

Para compilar el frontend:

```bash
npm run build
```

Para revisar la compilación:

```bash
npm run preview
```

## ⬆️ Subida del proyecto

El código se publica en la rama `main`. Las carpetas `node_modules` y `dist` se excluyen del repositorio. El archivo `.env.example` indica cómo configurar la dirección de la API.

Antes de publicar, configurar el alojamiento para que las rutas de la aplicación sirvan `index.html` y comprobar que el backend esté disponible desde el sitio publicado.

## 🔗 Repositorio

[Ver repositorio en GitHub](https://github.com/cadina-sandy/Hito7-router2-react)
[Ver sitio web en GitHub Pages](https://cadina-sandy.github.io/Hito7-router2-react/)


## 👩‍💻 Autora

**Sandy Cadin**
