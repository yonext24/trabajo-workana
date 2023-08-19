import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layout/slice'
import dataReducer from './data/slice'
import usuariosReducer from './usuarios/slice'

const rollbackerMiddleware = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }

  next(action)
}

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    data: dataReducer,
    usuarios: usuariosReducer
  },
  middleware: [rollbackerMiddleware]
})
