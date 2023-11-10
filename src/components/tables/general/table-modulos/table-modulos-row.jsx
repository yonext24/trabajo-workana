import { useDataActions } from '@/hooks/useDataActions'
import { SwitchButton } from '@/components/common/table-buttons'
import { parseEstado } from '@/utils/consts'

export function TableModulosRow({ nombre, tipo, permissions, id, estado }) {
  const { switchModulos } = useDataActions()

  const handleDel = async () => await switchModulos({ id, estado })
  const { CREATE } = permissions

  return (
    <tr data-disabled={!estado} className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
      <td className="border-r">{tipo}</td>
      <td className="border-r">{nombre}</td>
      <td className="border-r !text-center">{parseEstado(estado)}</td>
      <td>
        <div className="w-full h-full flex justify-center items-center gap-4">
          {CREATE && (
            <>
              <SwitchButton estado={estado} handleClick={handleDel} />
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
