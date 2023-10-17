import { useDataActions } from '@/hooks/useDataActions'
import { UpdateModulosModal } from '@/components/modals/general/modulos/update-modulos-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { DeactivateButton, UpdateButton } from '@/components/common/table-buttons'

export function TableModulosRow ({ nombre, tipo, permissions }) {
  const { delModulos } = useDataActions()

  const { handleDel, handleUpd } = useTableDefaultModals({
    place: 'modulos',
    update: { el: UpdateModulosModal, nombre, tipo },
    del: {
      onClick: () => { delModulos(nombre) },
      title: 'Desactivar Modulo',
      sure: 'Realmente quiere desactivar este modulo?'
    }
  })

  const { CREATE } = permissions

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className='border-r'>{tipo}</td>
    <td className="border-r">{nombre}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          CREATE && <>
            <UpdateButton handleClick={handleUpd} />
            <DeactivateButton handleClick={handleDel} />
          </>
        }

      </div>
    </td>
  </tr>
}
