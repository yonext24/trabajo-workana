import { createSlice } from '@reduxjs/toolkit'
import { checkSession, login } from './thunks'

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
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
      state.user = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload
        state.logged = USER_POSSIBLE_STATES.LOGGED
        state.token = token // 571716
        state.user = user
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        if (action.payload === false) {
          state.logged = USER_POSSIBLE_STATES.NOT_LOGGED
          state.user = null
        } else {
          const { user, token } = action.payload

          state.logged = USER_POSSIBLE_STATES.LOGGED
          state.user = user
          state.token = token
        }
      })
  }
})

export default authSlice.reducer
export const { logout } = authSlice.actions
