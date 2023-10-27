import { useEffect } from 'react'

export function useModalLogic({ closeModal, noScroll = false }) {
  useEffect(() => {
    const html = document.querySelector('html')
    if (html == null) return

    const onKeyDown = e => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)
    if (noScroll) {
      html.style.overflow = 'hidden'
    }

    return () => {
      html.removeEventListener('keydown', onKeyDown)
      if (noScroll) {
        html.style.overflow = 'auto'
      }
    }
  }, [])
}
