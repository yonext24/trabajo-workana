import { useDispatch } from 'react-redux'
import { set_screen_width, set_navbar_mobile, open_modal, close_modal } from '../store/layout/slice'

export function useLayoutActions () {
  const dispatch = useDispatch()

  const setScreenWidth = (width) => { dispatch(set_screen_width({ width })) }
  const setNavbarMobile = (open) => { dispatch(set_navbar_mobile({ open })) }

  const openModal = (modal) => { dispatch(open_modal({ modal })) }
  const closeModal = (id) => { dispatch(close_modal({ id })) }

  return { setScreenWidth, setNavbarMobile, openModal, closeModal }
}
