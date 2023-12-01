import { SwitchButton, UpdateButton } from '@/components/common/table-buttons'
import { useDataActions } from '../../../../hooks/useDataActions'
import { UpdateDependenciaModal } from '../../../modals/general/dependencias/update-dependencia-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { parseEstado } from '@/utils/consts'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'

export function TableDependenciasRow({
  sector,
  nombre,
  abreviatura,
  unidad,
  permissions,
  id_dependencia,
  id_sector,
  id_unidad,
  estado
}) {
  const { switchStateDependencias } = useDataActions()

  const { UPDATE } = permissions

  const { handleUpd } = useTableDefaultModals({
    place: 'dependencia',
    update: {
      el: UpdateDependenciaModal,
      entryData: {
        sector,
        nombre,
        abreviatura,
        unidad,
        id_dependencia,
        id_sector,
        id_unidad
      }
    }
  })

  const handleDel = async () => {
    await switchStateDependencias({
      id_dependencia,
      id_sector,
      id_unidad,
      abreviatura,
      estado
    })
  }

  const unidades = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad.data)
  const currentUnidad = useMemo(
    () => unidades.find(u => u.id_unidad === id_unidad)?.nombre ?? 'Desconocido',
    [unidades, id_unidad]
  )

  return (
    <tr
      data-disabled={!estado}
      className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px] [&>td]:border-r [&>td]:text-center [&>td:last-of-type]:border-r-0"
    >
      <td>{sector}</td>
      <td>{nombre}</td>
      <td>{abreviatura}</td>
      <td>{currentUnidad}</td>
      <td className="!text-center">{parseEstado(estado)}</td>
      <td>
        <div className="w-full h-full flex justify-center items-center gap-4">
          {UPDATE && (
            <>
              <SwitchButton estado={estado} handleClick={handleDel} />
              <UpdateButton handleClick={handleUpd} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
