import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layout/slice'
import dataReducer from './general/slice'
import usuariosReducer from './usuarios/slice'
import ofertaAcademicaReducer from './oferta-academica/slice'
import authReducer from './auth/slice'
import geografiaReducer from './geografia/slice'

const rollbackerMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }

  next(action)
}

export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      layout: layoutReducer,
      data: dataReducer,
      usuarios: usuariosReducer,
      ofertaAcademica: ofertaAcademicaReducer,
      auth: authReducer,
      geografia: geografiaReducer
    },
    middleware: [rollbackerMiddleware],
    preloadedState
  })
}

export const store = setupStore({})
