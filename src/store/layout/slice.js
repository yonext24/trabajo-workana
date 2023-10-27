import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navbar: {
    mobile: {
      open: false
    }
  },
  screenWidth: {
    width: undefined,
    isMobile: null
  },
  modals: []
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    set_screen_width: (state, action) => {
      const { width } = action.payload
      state.screenWidth.width = width
      state.screenWidth.isMobile = width <= 800
    },
    set_navbar_mobile: (state, action) => {
      const { open } = action.payload
      state.navbar.mobile.open = open
    },

    open_modal: (state, action) => {
      const { modal } = action.payload // <-- "modal" es un objeto con este formato: { Element: <React.NodeElement>, props: {}, id: int }
      state.modals.push(modal)
    },
    close_modal: (state, action) => {
      const { id } = action.payload
      const newModals = state.modals.filter(modal => modal.id !== id)
      state.modals = newModals
    }
  }
})

export default layoutSlice.reducer
export const { set_screen_width, set_navbar_mobile, open_modal, close_modal } =
  layoutSlice.actions
