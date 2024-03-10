import { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'

/*
    Se crea un componente Router personalizado que recibe el history externamente,
    y se utiliza para ser capaces de cambiar la ubicación del Router desde cualquier
    parte de la aplicación, como por ejemplo desde el appFetch, en el caso de que
    falten las credenciales correspondientes para hacer una petición.
*/

export const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(setState), [history])

  return <Router {...props} location={state.location} navigationType={state.action} navigator={history} />
}
