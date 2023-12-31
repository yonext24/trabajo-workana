import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navbar: {
    mobile: {
      open: false
    }
  },
  screenData: {
    height: undefined,
    width: undefined,
    isMobile: null
  },
  modals: []
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    set_screen_data: (state, action) => {
      const { width, height } = action.payload
      state.screenData.width = width
      state.screenData.height = height
      state.screenData.isMobile = width <= 800
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
    },
    close_all_modals: state => {
      state.modals = []
    }
  }
})

export default layoutSlice.reducer
export const { set_screen_data, set_navbar_mobile, open_modal, close_modal, close_all_modals } = layoutSlice.actions
