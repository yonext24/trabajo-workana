import { useDispatch } from 'react-redux'
import { set_screen_data, set_navbar_mobile, open_modal, close_modal } from '../store/layout/slice'

export function useLayoutActions() {
  const dispatch = useDispatch()

  const setScreenData = (width, height) => {
    dispatch(set_screen_data({ width, height }))
  }
  const setNavbarMobile = open => {
    dispatch(set_navbar_mobile({ open }))
  }

  const openModal = modal => {
    dispatch(open_modal({ modal }))
  }
  const closeModal = id => {
    dispatch(close_modal({ id }))
  }

  return { setScreenData, setNavbarMobile, openModal, closeModal }
}
