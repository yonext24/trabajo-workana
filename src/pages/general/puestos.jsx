import { NuevoButton } from '../../components/common/nuevo-button'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { TablePuestos } from '../../components/tables/general/table-puestos/table-puestos'
import { AddPuestosModal } from '../../components/modals/general/puestos/add-puestos-modal'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Puestos () {
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: AddPuestosModal,
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
    <TablePuestos />
  </div>
}
