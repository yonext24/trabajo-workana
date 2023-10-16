import { DeactivateButton, UpdateButton } from '@/components/common/table-buttons'
import { useDataActions } from '../../../../hooks/useDataActions'
import { UpdateDependenciaModal } from '../../../modals/general/dependencias/update-dependencia-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function TableDependenciasRow ({ sector, nombre, abreviatura, unidad, id, permissions }) {
  const { delDependenciesData } = useDataActions()

  const { UPDATE } = permissions

  const { handleDel, handleUpd } = useTableDefaultModals({
    place: 'dependencias',
    update: { el: UpdateDependenciaModal, entryData: { sector, nombre, abreviatura, unidad, id } },
    del: {
      onClick: () => {
        delDependenciesData(nombre)
      },
      title: 'Eliminar Dependencia',
      sure: 'Realmente quiere eliminar esta dependencia?'
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
