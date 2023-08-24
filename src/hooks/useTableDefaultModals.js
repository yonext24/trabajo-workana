import { DefaultComp } from '@/components/fallbacks/default-comp'
import { useLayoutActions } from './useLayoutActions'
import { DeleteModal } from '@/components/modals/delete-modal'

export function useTableDefaultModals ({ place, add, update, del, perm, see }) {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleAdd = () => {
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
  const handleUpd = () => {
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
  const handleDel = () => {
    const modalId = `delete-${place}-modal`
    openModal({
      Element: del?.el ?? DeleteModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        title: `Eliminar ${place.charAt(0).toUpperCase().concat(place.substring(1, place.length))}`,
        sure: `Realmente quiere eliminar este ${place}?`,
        ...del
      }
    })
  }
  const handlePerm = (funcProps) => {
    const modalId = `permissions-${place}-modal`
    openModal({
      Element: perm?.el ?? DefaultComp,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        ...perm,
        ...funcProps
      }
    })
  }
  const handleSee = (funcProps) => {
    const modalId = `see-${place}-modal`
    openModal({
      Element: see?.el ?? DefaultComp,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        ...see,
        ...funcProps
      }
    })
  }

  return { handleAdd, handleDel, handleUpd, handlePerm, handleSee }
}
