# Documentación del Proyecto

## Tecnologías Utilizadas

Este proyecto se construyó utilizando un stack moderno y eficiente para el desarrollo de aplicaciones web. Las tecnologías clave incluyen:

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario con componentes reutilizables y eficientes.
- **Redux**: Un contenedor de estado predecible para aplicaciones JavaScript, que facilita la gestión del estado global.
- **Vite**: Un nuevo frontend build tool que mejora significativamente la experiencia de desarrollo con su servidor de desarrollo ultrarrápido y optimizaciones de compilación.
- **TailwindCSS**: Un framework CSS que permite diseñar rápidamente interfaces personalizadas sin salir del HTML.
- **React Hook Form**: Una biblioteca que permite manejar formularios con hooks en React, simplificando la validación y el manejo de estados.

## Directorios Principales

- **`public/`**: Contiene los archivos estáticos de la aplicación, como el logo y las fuentes.
- **`src/`**: Contiene el código fuente de la aplicación.
  - **App.jsx**: Punto de entrada principal de la aplicación.
  - **`hooks/`**: Contiene los custom hooks utilizados en la aplicación.
  - **`utils/`**: Contiene utilidades y helpers de la aplicación.
  - **`pages/`**: Contiene las páginas de la aplicación.
  - **`store/`**: Contiene la configuración de Redux, incluyendo los slices y el store.
  - **`components/`**: Contiene los componentes reutilizables de la aplicación.
    - **`modals/`**: Contiene los componentes de modales (mayormente menús) de la aplicación.
    - **`tables/`**: Contiene los componentes de tablas de la aplicación.

## Configuración del Entorno de Desarrollo

Para iniciar el proyecto en un entorno de desarrollo, sigue los siguientes pasos:

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`.

## Despliegue con Docker

Para construir y ejecutar el proyecto en un contenedor Docker, utiliza los siguientes comandos:

```bash
docker build -t vite-react-app:latest .
docker run -p 3000:3000 vite-react-app:latest
```

Esto te permitirá acceder a la aplicación en `http://localhost:3000`.

## Aclaraciones técnicas

## Arquitectura del Proyecto

El proyecto sigue una estructura modular y escalable. El punto de entrada principal es `src/App.jsx`, donde se importan y ensamblan los componentes principales. Se recomienda comenzar la exploración del código desde este archivo.

### Manejo de Modales

El sistema de modales se gestiona a través de Redux. Se define un slice para controlar el estado de las modales y sus propiedades. Las modales se renderizan en el layout principal utilizando un portal de React, lo que permite invocarlas desde cualquier parte de la aplicación.

Ejemplo de implementación de modales:

```jsx
// src/layouts/GeneralTabsLayout.jsx
import { ReactPortal } from '../modals/react-portal'
import { useSelector } from 'react-redux'

function GeneralTabsLayout() {
  const { modals } = useSelector(state => state.layout)

  return (
    <ReactPortal wrapperId="general-portal-wrapper">
      {modals.map(({ Element, id, props }) => (
        <Element key={id} {...props} />
      ))}
    </ReactPortal>
  )
}
```

### Fetching de Datos

Para interactuar con la API, se utiliza un helper global `appFetch` que encapsula las credenciales del usuario y simplifica las peticiones HTTP. Este helper se encuentra en `src/utils/fetchHandler.js` y se puede utilizar de la siguiente manera:

```js
// Ejemplo de uso del helper appFetch
import { appFetch } from '../utils/fetchHandler'

async function crearTipoUA(nombre, descripcion) {
  return await appFetch(`${BASE_OFERTA_URL}/rye/tipo_ua/nuevo`, {
    method: 'POST',
    body: JSON.stringify({ nombre, descripcion })
  })
}
```

### Manejo de Permisos

Todos los permisos del usuario se reciben desde la API al entrar a la aplicación o al iniciar sesión, se analizan y se guardan en la store de redux para su posterior uso.

```js
// src\store\auth\thunks.js
const getUserData = async ({ token }) => {
  const user = await appFetch(auth.perfil)
  const userPermissions = await appFetch(auth.permisos)
  const { modulos, operaciones } = await appFetch(auth.parametros)

  //  permissionParser se encarga de fusionar los permisos del usuario con los modulos y
  //  operaciones y los devuelve en un formato ideal para su uso en los componentes:
  //  {
  //    READ: boolean
  //    WRITE: boolean
  //    UPDATE: boolean
  //  }
  const parsedPermissions = permissionParser({
    userPermissions,
    modulos,
    operaciones
  })

  return { user, permissions: parsedPermissions, operacion: operaciones }
}
```

- Leer

Los permisos de lectura estan manejados mayormente desde el componente ProtectedRoute en el archivo src\components\layouts\protected-route.jsx.
Desde este wrapper, que recibe el nombre del módulo, se verifica si el usuario tiene el permiso necesario para acceder a la ruta, en caso de no tenerlo, se redirige a la ruta de inicio de sesión.

```jsx
<Route
  element={
    <ProtectedRoute name="GENERAL" parsedName="General">
      <GeneralTabsLayout tabsName="general">
        <Outlet />
      </GeneralTabsLayout>
    </ProtectedRoute>
  }
>
  <Route path="/general/sectores" element={<Sectores />} />
  <Route path="/general/dependencias" element={<Dependencias />} />
  <Route path="/general/puestos" element={<Puestos />} />
  <Route path="/general/modulos" element={<Modulos />} />
</Route>
```

Internamente, el componente ProtectedRoute hace uso de la store de Redux, que contiene los permisos del usuario ya parseados, como se mostró anteriormente.

- Permisos de Escritura, Actualización y Eliminación

Estos permisos se manejan a nivel de componentes y muestran o esconden botones o acciones dependiendo de si el usuario tiene el permiso necesario.

```jsx
export function CentrosEducativos() {
  // ...
  // El custom hook usePermissions simplemente es una forma simplificada de obtener los permisos del usuario desde la store de Redux.
  const permissions = usePermissions({ nameOfModule: 'CENTROS_EDUCATIVOS' })
  const { CREATE } = permissions
  // ...

  return (
    <div>
      <div>
        <CentrosEducativosFilter />
        <div>
          <NuevoButton handleClick={handleAdd} content="Cargar Excel" CREATE={CREATE} />
          // NuevoButton es un componente que recibe el permiso CREATE y muestra o esconde el // botón de agregar dependiendo
          de si el usuario tiene el permiso.
        </div>
      </div>
      <CentrosEducativosTable />
      // Las tablas obtienen los permisos desde el estado global, para evitar hacer 
      // uso de prop drilling.
    </div>
  )
}
```
