import { NuevoButton } from '../../components/common/nuevo-button'
import { TableModulos } from '../../components/tables/general/table-modulos/table-modulos'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { AddModulosModal } from '../../components/modals/general/modulos/add-modulos-modal'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Modulos () {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleClick = () => {
    const modalId = 'add-modulos-modal'
    openModal({
      Element: AddModulosModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  return <div id='page-content'>
    <NuevoButton handleClick={handleClick} />
    <TableModulos />
  </div>
}
