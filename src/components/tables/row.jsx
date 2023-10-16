import { DeactivateButton, PermissionsButton, SeeButton, UpdateButton } from '../common/table-buttons'
import { Plus, RecycleIcon } from '../icons'

export function Row ({ text, actions = false, carreras = false, funcProps, className }) {
  return <td className={`border-r ${className ?? ''}`}>
    {
      actions
        ? <div className="w-full h-full flex justify-center items-center gap-4">
        {
          actions.map(({ type, onClick, ...props }) => {
            if (type === 'update') {
              return <UpdateButton handleClick={() => onClick(funcProps)} key={type} {...props} />
            }
            if (type === 'delete') {
              return <DeactivateButton handleClick={() => onClick(funcProps)} key={type} {...props} />
            }
            if (type === 'permisos') {
              return <PermissionsButton handleClick={() => onClick(funcProps)} key={type} {...props} />
            }
            if (type === 'see') {
              return <SeeButton handleClick={() => onClick(funcProps)} key={type} {...props} />
            }
            return null
          })
        }
      </div>
        : carreras
          ? <div className="w-full h-full flex justify-center items-center gap-4">
        {
          carreras.map(({ type, onClick }) => {
            if (type === 'add') {
              return <button key={type} onClick={() => onClick(funcProps)} className='bg-verde text-white p-1 rounded-md'>
                <Plus className='h-5 w-5' />
              </button>
            }
            if (type === 'see') {
              return <button key={type} onClick={() => onClick(funcProps)} className='bg-red-500 text-white p-1 rounded-full'>
                <RecycleIcon className='h-5 w-5' />
              </button>
            }
            return null
          })
        }
      </div>
          : text
    }
  </td>
}
