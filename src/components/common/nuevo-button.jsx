import { useLayoutActions } from '../../hooks/useLayoutActions'
import { PlusRoundedIcon } from '../icons'
import { AddSectorModal } from '../modals/general/add-sector.modal'

export function NuevoButton () {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: AddSectorModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  return <button onClick={handleClick} className="text-button bg-gris-oscuro text-white w-max rounded-md flex gap-2 px-6 py-1 items-center">
    <PlusRoundedIcon className='h-8 w-8' />
    <span>Nuevo</span>
  </button>
}
