import { useDataActions } from '@/hooks/useDataActions'
import { DeactivateButton } from '@/components/common/table-buttons'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function TableGeneralRow ({ nombre, estado, permissions, id_sector }) {
  const { delSectoresData } = useDataActions()
  const { handleDel } = useTableDefaultModals({
    place: 'sector',
    del: {
      onClick: async () => {
        await delSectoresData(id_sector)
      }
    }
  })

  const { UPDATE } = permissions

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{nombre}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          UPDATE
            ? <>
                <DeactivateButton handleClick={handleDel} />
              </>
            : <div></div>
        }

      </div>
    </td>
  </tr>
}
