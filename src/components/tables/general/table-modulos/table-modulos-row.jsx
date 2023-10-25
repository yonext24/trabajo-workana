import { useDataActions } from '@/hooks/useDataActions'
import { useTableDefaultModals } from '@/hooks/useTableDefaultModals'
import { DeactivateButton } from '@/components/common/table-buttons'

export function TableModulosRow ({ nombre, tipo, permissions, id, estado }) {
  const { delModulos } = useDataActions()

  const { handleDel } = useTableDefaultModals({
    place: 'modulos',
    del: {
      onClick: async () => delModulos({ id }),
      title: 'Desactivar Modulo',
      sure: 'Realmente quiere desactivar este modulo?'
    }
  })

  const { CREATE } = permissions

  return <tr className="[&_td]:border-b [&_td]:py-3 [padding-inline:20px]">
    <td className='border-r'>{tipo}</td>
    <td className="border-r">{nombre}</td>
    <td className="border-r">{estado ? 'Activado' : 'Desactivado'}</td>
    <td>
      <div className="w-full h-full flex justify-center items-center gap-4">

        {
          CREATE && <>
            <DeactivateButton handleClick={handleDel} />
          </>
        }

      </div>
    </td>
  </tr>
}
