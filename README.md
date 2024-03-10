# Documentación del Proyecto

## Tecnologías Utilizadas

Este proyecto se construyó utilizando un stack moderno y eficiente para el desarrollo de aplicaciones web. Las tecnologías clave incluyen:

- **React**: Una biblioteca de JavaScript para construir interfaces de usuario con componentes reutilizables y eficientes.
- **Redux**: Un contenedor de estado predecible para aplicaciones JavaScript, que facilita la gestión del estado global.
- **Vite**: Un nuevo frontend build tool que mejora significativamente la experiencia de desarrollo con su servidor de desarrollo ultrarrápido y optimizaciones de compilación.
- **TailwindCSS**: Un framework CSS que permite diseñar rápidamente interfaces personalizadas sin salir del HTML.
- **React Hook Form**: Una biblioteca que permite manejar formularios con hooks en React, simplificando la validación y el manejo de estados.

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
