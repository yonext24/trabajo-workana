import { useDataActions } from '@/hooks/useDataActions'
import { SwitchButton } from '@/components/common/table-buttons'
import { parseEstado } from '@/utils/consts'

export function TableGeneralRow({ nombre, estado, permissions, id_sector }) {
  const { switchSectoresData } = useDataActions()

  const handleDel = async () => switchSectoresData({ id_sector, estado })
  const { UPDATE } = permissions

  return (
    <tr data-disabled={!estado} className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
      <td className="border-r">{nombre}</td>
      <td className="border-r !w-max !text-center">{parseEstado(estado)}</td>
      <td>
        <div className="w-full h-full flex justify-center items-center gap-4">
          {UPDATE ? (
            <>
              <SwitchButton estado={estado} handleClick={handleDel} />
            </>
          ) : (
            <div></div>
          )}
        </div>
      </td>
    </tr>
  )
}
