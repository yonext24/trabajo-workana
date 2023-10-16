import { useDataActions } from '@/hooks/useDataActions'
import { UpdatePuestosModal } from '@/components/modals/general/puestos/update-puestos-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { DeactivateButton, UpdateButton } from '@/components/common/table-buttons'

export function TablePuestosRow ({ text, permissions }) {
  const { delPuestosData } = useDataActions()

  const { UPDATE } = permissions

  const { handleDel, handleUpd } = useTableDefaultModals({
    place: 'dependencias',
    update: { el: UpdatePuestosModal, entry: text },
    del: {
      onClick: () => {
        delPuestosData(text)
      },
      title: 'Desactivar Puesto',
      sure: 'Realmente quiere desactivar este puesto?'
    }

  })

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{text}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          UPDATE && <>
            <UpdateButton handleClick={handleUpd} />
            <DeactivateButton handleClick={handleDel} />
          </>

        }

      </div>
    </td>
  </tr>
}
