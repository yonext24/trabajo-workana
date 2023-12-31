import { createSlice } from '@reduxjs/toolkit'
import { checkSession, login, revalidatePermissions } from './thunks'
import { toast } from 'react-toastify'

export const USER_POSSIBLE_STATES = {
  NOT_KNOWN: undefined,
  NOT_LOGGED: false,
  LOGGED: true
}

const initialState = {
  logged: USER_POSSIBLE_STATES.NOT_KNOWN,
  token: null,
  user: null,
  loading: false,
  error: null,
  permissions: null,
  operacion: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      if (action.payload === 'expired') {
        toast.error('Tu sesión ha expirado, porfavor vuelve a iniciar sesión.')
      }

      localStorage.removeItem('token')
      state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
      state.user = null
    },
    changeUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { token, user, permissions, operacion } = action.payload
        state.logged = USER_POSSIBLE_STATES.LOGGED
        state.token = token // 571716
        state.user = user
        state.permissions = permissions
        state.operacion = operacion
        state.error = null
        state.loading = false
      })
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        toast.error(action.error.message)
        state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
        state.user = null
        state.token = null
        state.permissions = null
        state.loading = false
        state.error = action.error.message
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        if (action.payload === false) {
          state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
          state.user = null
        } else {
          const { token, user, permissions, operacion } = action.payload

          state.logged = USER_POSSIBLE_STATES.LOGGED
          state.token = token // 571716
          state.user = user
          state.permissions = permissions
          state.operacion = operacion
          state.error = null
          state.loading = false
        }
      })
      .addCase(checkSession.rejected, state => {
        state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
        state.user = null
        state.token = null
        state.permissions = null
      })
      .addCase(revalidatePermissions.fulfilled, (state, action) => {
        const { parsedPermissions, operacion } = action.payload

        state.permissions = parsedPermissions
        state.operacion = operacion
      })
  }
})

export default authSlice.reducer
export const { logout, changeUser } = authSlice.actions
