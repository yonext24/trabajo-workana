import { useDataActions } from '../../../../hooks/useDataActions'
import { useLayoutActions } from '../../../../hooks/useLayoutActions'
import { PenIcon, TrashIcon } from '../../../icons'
import { DeleteModal } from '../../../modals/delete-modal'
import { UpdateDependenciaModal } from '../../../modals/general/dependencias/update-dependencia-modal'

export function TableDependenciasRow ({ sector, nombre, abreviatura, unidad, id }) {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()
  const { delDependenciesData } = useDataActions()

  const handleUpdateClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: UpdateDependenciaModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        },
        entryData: { sector, nombre, abreviatura, unidad, id }
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
          delDependenciesData(nombre)
        },
        title: 'Eliminar Dependencia',
        sure: 'Realmente quiere eliminar esta dependencia?'
      }
    })
  }

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px] [&>td]:border-r [&>td]:text-center [&>td:last-of-type]:border-r-0">
    <td>{sector}</td>
    <td>{nombre}</td>
    <td>{abreviatura}</td>
    <td>{unidad}</td>
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
