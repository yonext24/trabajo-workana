import { useEffect } from 'react'

export function useModalLogic({ closeModal, noScroll = false }) {
  useEffect(() => {
    if (document) {
      try {
        if (!document.activeElement) return
        if (document.activeElement.closest('#modalBackground')) return
        document.activeElement.blur()
      } catch {
        // ignore
      }
    }
    const html = document.querySelector('html')
    if (html == null) return

    const onKeyDown = e => {
      if (e.key === 'Escape') closeModal()
    }

    html.addEventListener('keydown', onKeyDown)
    if (noScroll) {
      html.style.overflow = 'hidden'
      html.style.paddingRight = '15px'
    }

    return () => {
      html.removeEventListener('keydown', onKeyDown)
      if (noScroll) {
        html.style.overflow = 'auto'
        html.style.paddingRight = '0'
      }
    }
  }, [])
}
