import { useDataActions } from '@/hooks/useDataActions'
import { UpdateSectorModal } from '@/components/modals/general/sectores/update-sector-modal'
import { DeactivateButton, UpdateButton } from '@/components/common/table-buttons'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function TableGeneralRow ({ text, permissions }) {
  const { delSectoresData } = useDataActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'general',
    update: { el: UpdateSectorModal, entry: text },
    del: {
      title: 'Desactivar usuario',
      sure: 'Realmente quieres desactivar este usuario?',
      onClick: () => {
        delSectoresData(text)
      }
    }
  })

  const { UPDATE } = permissions

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{text}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          UPDATE
            ? <>
                <UpdateButton handleClick={handleUpd} text='Actualizar' />
                <DeactivateButton handleClick={handleDel} />
              </>
            : <div></div>
        }

      </div>
    </td>
  </tr>
}
