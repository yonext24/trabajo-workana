import { useDataActions } from '@/hooks/useDataActions'
import { useLayoutActions } from '@/hooks/useLayoutActions'
import { PenIcon, TrashIcon } from '@/components/icons'
import { DeleteModal } from '@/components/modals/delete-modal'
import { UpdateSectorModal } from '@/components/modals/sectores/update-sector-modal'

export function TableGeneralRow ({ text }) {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { delSectoresData } = useDataActions()

  const handleUpdateClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: UpdateSectorModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        entry: text
      }
    })
  }

  const handleDeleteClick = () => {
    const modalId = 'delete-general-modal'
    openModal({
      Element: DeleteModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        onClick: () => {
          delSectoresData(text)
        },
        title: 'Eliminar Sector',
        sure: 'Realmente quiere eliminar este sector?'
      }
    })
  }

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{text}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        <button onClick={handleUpdateClick} className="bg-verde text-white p-1 rounded-md">
          <PenIcon className='h-5 w-5' />
        </button>

        <button onClick={handleDeleteClick} className="bg-red-500 text-white p-1 rounded-md">
          <TrashIcon className='h-5 w-5' />
        </button>

      </div>
    </td>
  </tr>
}
