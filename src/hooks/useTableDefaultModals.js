import { DefaultComp } from '@/components/fallbacks/default-comp'
import { useLayoutActions } from './useLayoutActions'
import { DeleteModal } from '@/components/modals/delete-modal'

export function useTableDefaultModals ({ place, add, update, del }) {
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
        ...add.props
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
        ...update.props
      }
    })
  }

  const handleDel = () => {
    const modalId = `delete-${place}-modal`
    openModal({
      Element: del?.el ?? DefaultComp,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        title: `Eliminar ${place.charAt(0).toUpperCase().concat(place.substring(1, place.length))}`,
        sure: `Realmente quiere eliminar este ${place}?`,
        ...del.props
      }
    })
  }

  return { handleAdd, handleDel, handleUpd }
}
