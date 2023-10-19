import { DeactivateButton, UpdateButton } from '@/components/common/table-buttons'
import { useDataActions } from '../../../../hooks/useDataActions'
import { UpdateDependenciaModal } from '../../../modals/general/dependencias/update-dependencia-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function TableDependenciasRow ({ sector, nombre, abreviatura, unidad, id, permissions, id_dependencia, id_sector, id_unidad }) {
  const { delDependenciesData } = useDataActions()

  const { UPDATE } = permissions

  const { handleDel, handleUpd } = useTableDefaultModals({
    place: 'dependencia',
    update: { el: UpdateDependenciaModal, entryData: { sector, nombre, abreviatura, unidad, id_dependencia, id_sector, id_unidad } },
    del: {
      onClick: () => {
        delDependenciesData({ id_dependencia, id_sector, id_unidad, abreviatura })
      }
    }
  })

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px] [&>td]:border-r [&>td]:text-center [&>td:last-of-type]:border-r-0">
    <td>{sector}</td>
    <td>{nombre}</td>
    <td>{abreviatura}</td>
    <td>{unidad}</td>
    <td>
    <div className="w-full h-full flex justify-center items-center gap-4">

      {
        UPDATE &&
        <>
          <UpdateButton handleClick={handleUpd} />
          <DeactivateButton handleClick={handleDel} />
        </>
      }

    </div>

    </td>
  </tr>
}
