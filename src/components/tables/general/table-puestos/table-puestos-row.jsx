import { SwitchButton } from '@/components/common/table-buttons'
import { useDataActions } from '@/hooks/useDataActions'
import { parseEstado } from '@/utils/consts'

export function TablePuestosRow({ descripcion, permissions, id_puesto, estado }) {
  const { switchPuestosData } = useDataActions()

  const { UPDATE } = permissions

  const handleDel = async () => switchPuestosData({ descripcion, id_puesto, estado })

  return (
    <tr data-disabled={!estado} className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
      <td className="border-r">{descripcion}</td>
      <td className="border-r !text-center">{parseEstado(estado)}</td>
      <td>
        <div className="w-full h-full flex justify-center items-center gap-4">
          {UPDATE && (
            <>
              <SwitchButton estado={estado} handleClick={handleDel} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
