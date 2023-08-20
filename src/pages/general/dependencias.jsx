import { useSelector } from 'react-redux'
import { TableDependencias } from '../../components/tables/general/table-dependencias/table-dependencias'
import { NuevoButton } from '../../components/common/nuevo-button'
import { Filter } from '../../components/general/filter'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { DependenciasAddModal } from '../../components/modals/general/dependencias/dependencias-add-modal'

// Esta página y todas las de la carpeta /general tienen un layout ya integrado, en /components/layout/general-tabs-layout
// y ahí esta estilado el div#page-content

export function Dependencias () {
  const { general: { dependencias: { data: { filtered } } } } = useSelector(s => s.data)
  const { openModal, closeModal: closeModalFunc } = useLayoutActions()

  const handleClick = () => {
    const modalId = 'update-general-modal'
    openModal({
      Element: DependenciasAddModal,
      id: modalId,
      props: {
        closeModal: () => {
          closeModalFunc(modalId)
        }
      }
    })
  }

  return <div id='page-content'>
    <div className="w-full flex justify-between items-end">

      <Filter />
      <NuevoButton handleClick={handleClick} />

    </div>
    <TableDependencias data={filtered} />
  </div>
}
