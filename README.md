# Repositorio de web online

Este repositorio contiene el código del backend y el frontend de mi aplicación web online. A continuación, encontrarás instrucciones sobre cómo clonar el proyecto, configurar la base de datos MongoDB, iniciar el servidor y el frontend.

## Clonar el proyecto

Para clonar el proyecto, puedes usar el siguiente comando en tu terminal:

git clone https://github.com/JustKillu/WebInventario

## Configurar la base de datos MongoDB

Este proyecto utiliza MongoDB como base de datos. Para configurar MongoDB, sigue estos pasos:

1. Instala MongoDB en tu máquina local o configura una base de datos MongoDB en la nube.
2. Crea una base de datos llamada 'Inventario'.
3. En el archivo principal del servidor, asegúrate de que la cadena de conexión a MongoDB apunta a tu base de datos MongoDB.

## Iniciar el servidor

Para iniciar el servidor, navega hasta la carpeta del servidor en tu terminal y ejecuta el siguiente comando:

\`\`\`
node servidor.js
\`\`\`

El servidor debería comenzar a ejecutarse en `http://localhost:3001`.

## Iniciar el frontend

Para iniciar el frontend, navega hasta la carpeta del frontend en tu terminal y ejecuta el siguiente comando:

\`\`\`
npm run dev
\`\`\`

El frontend debería comenzar a ejecutarse en `http://localhost:5173`.

# Frontend del repositorio de web online

Este es el frontend de mi aplicación web online. Aquí encontrarás información sobre las rutas y componentes disponibles.

## Archivo principal de React (App.jsx)

El archivo principal de React (App.jsx) es el punto de entrada de la aplicación. Este archivo define las rutas de la aplicación y los componentes que se renderizan en cada ruta.

### Rutas disponibles

- `/`: La ruta raíz de la aplicación que renderiza el componente `HomePage`.
- `/register`: La ruta para el registro de usuarios que renderiza el componente `Register`.
- `/login`: La ruta para el inicio de sesión de usuarios que renderiza el componente `Login`.
- `/admin`: La ruta para la página de administración que renderiza el componente `Admin`. Desde aquí, se pueden modificar los datos de los usuarios registrados.
- `/perfil`: La ruta para la página de perfil de usuario que renderiza el componente `Perfil`.

### Componentes disponibles

- `Navbar`: Este componente se renderiza en todas las páginas y proporciona la navegación entre las diferentes rutas de la aplicación.
- `HomePage`: Este componente se renderiza en la ruta raíz (`/`) de la aplicación.
- `Register`: Este componente se renderiza en la ruta de registro (`/register`) y proporciona un formulario para que los nuevos usuarios se registren.
- `Login`: Este componente se renderiza en la ruta de inicio de sesión (`/login`) y proporciona un formulario para que los usuarios inicien sesión.
- `Admin`: Este componente se renderiza en la ruta de administración (`/admin`) y proporciona funcionalidades de administración para los usuarios con privilegios de administrador. Desde aquí, se pueden modificar los datos de los usuarios registrados.
- `Perfil`: Este componente se renderiza en la ruta de perfil (`/perfil`) y permite a los usuarios ver y editar su perfil.
- `EditProductForm`: Este componente proporciona un formulario para editar la información de un producto.
- `ProductForm`: Este componente proporciona un formulario para agregar o actualizar productos.
- `SearchBar`: Este componente representa la barra de búsqueda en una página web.

# Backend del repositorio de web online

Este es el backend de mi aplicación web online. Información sobre las rutas y funcionalidades disponibles.

## Archivo principal del servidor

El archivo principal para correr el servidor es un archivo Node.js que utiliza Express y se conecta a una base de datos MongoDB. Este archivo inicializa la aplicación Express, permite solicitudes CORS desde tu aplicación React, usa express.json() como middleware para analizar el cuerpo de las solicitudes JSON, se conecta a MongoDB y define las rutas de la aplicación.

## Modelo de usuario

El modelo de usuario define el esquema para los usuarios en la base de datos. Cada usuario tiene un nombre de usuario, contraseña, nombre, apellido, teléfono, país, correo electrónico, rol y una lista de productos favoritos. El modelo de usuario también incluye una función pre-save para hashear la contraseña antes de guardarla en la base de datos.

## Rutas del producto (productRoutes)

Las rutas del producto permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los productos de la base de datos.

- `GET /products`: Obtiene todos los productos.
- `POST /products`: Crea un nuevo producto.
- `PUT /products/:id`: Actualiza un producto existente por su ID.
- `DELETE /products/:id`: Elimina un producto existente por su ID.

## Rutas de autenticación (Auth routes)

Las rutas de autenticación permiten a los usuarios registrarse e interactuar con sus productos favoritos.

- `POST /register`: Registra un nuevo usuario.
- `POST /user/favorites`: Agrega o elimina un producto de los favoritos de un usuario.

## Rutas de autenticación adicionales (Auth routes)

Estas rutas adicionales permiten a los usuarios iniciar sesión, interactuar con sus productos favoritos, actualizar sus datos y más.

- `POST /login`: Inicia sesión un usuario existente.
- `GET /user/:id/favorites`: Obtiene los productos favoritos de un usuario.
- `GET /user`: Obtiene los detalles de un usuario autenticado.
- `GET /allusers`: Obtiene todos los usuarios (solo para administradores).
- `PUT /user/:id`: Actualiza los datos de un usuario.
- `DELETE /user/:id`: Elimina un usuario.
- `PUT /user/:id/password`: Actualiza la contraseña de un usuario.
- `PUT /update-user/:id`: Actualiza los datos de un usuario, incluyendo la contraseña.
