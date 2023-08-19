import { useDataActions } from '@/hooks/useDataActions'
import { PenIcon, TrashIcon } from '@/components/icons'
import { UpdatePuestosModal } from '@/components/modals/puestos/update-puestos-modal'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'

export function TableRolesRow ({ nombre, descripcion }) {
  const { delPuestosData } = useDataActions()
  const { handleUpd, handleDel } = useTableDefaultModals({
    place: 'roles',
    update: { el: UpdatePuestosModal, entry: nombre },
    del: {
      onClick: () => {
        delPuestosData(nombre)
      },
      title: 'Eliminar Usuario',
      sure: 'Realmente quiere eliminar este usuario?'
    }
  })

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className="border-r">{nombre}</td>
    <td className="border-r">{descripcion}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        <button onClick={handleUpd} className="bg-verde text-white p-1 rounded-md">
          <PenIcon className='h-5 w-5' />
        </button>

        <button onClick={handleDel} className="bg-red-500 text-white p-1 rounded-md">
          <TrashIcon className='h-5 w-5' />
        </button>

      </div>
    </td>
  </tr>
}
