import { useDataActions } from '@/hooks/useDataActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { DeactivateButton } from '@/components/common/table-buttons'

export function TablePuestosRow ({ descripcion, permissions, id_puesto }) {
  const { delPuestosData } = useDataActions()

  const { UPDATE } = permissions

  const { handleDel } = useTableDefaultModals({
    place: 'puesto',
    del: {
      onClick: () => {
        delPuestosData({ descripcion, id_puesto })
      }
    }
  })

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{descripcion}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          UPDATE && <>
            <DeactivateButton handleClick={handleDel} />
          </>

        }

      </div>
    </td>
  </tr>
}
