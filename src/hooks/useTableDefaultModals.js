import { DefaultComp } from '@/components/fallbacks/default-comp'
import { useLayoutActions } from './useLayoutActions'
import { DeleteModal } from '@/components/modals/delete-modal'
import { useMemo } from 'react'

export function useTableDefaultModals({ place, add, update, del, perm, see }) {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleSee = useMemo(() => {
    if (!see) return undefined
    return () => {
      const modalId = `see-${place}-modal`
      openModal({
        Element: see?.el || DefaultComp,
        id: modalId,
        props: {
          closeModal: () => {
            closeModalFunc(modalId)
          },
          ...see
        }
      })
    }
  }, [see, place])

  const handleAdd = useMemo(() => {
    if (!add) return undefined
    return () => {
      const modalId = `add-${place}-modal`
      openModal({
        Element: add?.el || DefaultComp,
        id: modalId,
        props: {
          closeModal: () => {
            closeModalFunc(modalId)
          },
          ...add
        }
      })
    }
  }, [add, place])

  const handleUpd = useMemo(() => {
    if (!update) return undefined
    return () => {
      const modalId = `update-${place}-modal`
      openModal({
        Element: update?.el ?? DeleteModal,
        id: modalId,
        props: {
          closeModal: () => {
            closeModalFunc(modalId)
          },
          ...update
        }
      })
    }
  }, [update, place])

  const handleDel = useMemo(() => {
    if (!del) return undefined
    return () => {
      const modalId = `delete-${place}-modal`
      openModal({
        Element: del?.el ?? DeleteModal,
        id: modalId,
        props: {
          closeModal: () => {
            closeModalFunc(modalId)
          },
          title: `Desactivar ${place.charAt(0).toUpperCase().concat(place.substring(1, place.length))}`,
          sure: `Realmente quiere desactivar este ${place}?`,
          ...del
        }
      })
    }
  }, [del, place])

  const handlePerm = useMemo(() => {
    if (!perm) return undefined
    return funcProps => {
      const modalId = `permissions-${place}-modal`
      console.log(perm)
      openModal({
        Element: perm?.el ?? DefaultComp,
        id: modalId,
        props: {
          closeModal: () => {
            closeModalFunc(modalId)
          },
          ...funcProps,
          ...perm
        }
      })
    }
  }, [perm, place])

  return { handleAdd, handleDel, handleUpd, handlePerm, handleSee }
}
