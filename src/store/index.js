import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './layout/slice'
import dataReducer from './data/slice'

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    data: dataReducer
  },
  middleware: []
})
