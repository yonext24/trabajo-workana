import { DefaultComp } from '@/components/fallbacks/default-comp'
import { useLayoutActions } from './useLayoutActions'
import { DeleteModal } from '@/components/modals/delete-modal'
import { useMemo } from 'react'

export function useTableDefaultModals ({ place, add, update, del, perm, see }) {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handlers = useMemo(() => {
    return {
      handleSee: !see
        ? null
        : () => {
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
          },

      handleAdd: !add
        ? null
        : () => {
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
          },
      handleUpd: !update
        ? null
        : () => {
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
          },
      handleDel: !del
        ? null
        : () => {
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
          },
      handlePerm: !perm
        ? null
        : (funcProps) => {
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
    }
  }, [add, update, del, perm, see, place])

  return handlers
}
