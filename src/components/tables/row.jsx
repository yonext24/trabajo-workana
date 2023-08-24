import { EyeIcon, KeyIcon, PenIcon, Plus, RecycleIcon, TrashIcon } from '../icons'

export function Row ({ text, actions = false, carreras = false, funcProps, className }) {
  return <td className={`border-r ${className ?? ''}`}>
    {
      actions
        ? <div className="w-full h-full flex justify-center items-center gap-4">
        {
          actions.map(({ type, onClick }) => {
            if (type === 'update') {
              return <button key={type} onClick={() => onClick(funcProps)} className="bg-verde text-white p-1 rounded-md">
                <PenIcon className='h-5 w-5' />
              </button>
            }
            if (type === 'delete') {
              return <button key={type} onClick={() => onClick(funcProps)} className="bg-red-500 text-white p-1 rounded-md">
                <TrashIcon className='h-5 w-5' />
              </button>
            }
            if (type === 'permisos') {
              return <button key={type} onClick={() => onClick(funcProps)} className='bg-neutral-800 text-white p-1 rounded-md'>
                <KeyIcon className='h-5 w-5' />
              </button>
            }
            if (type === 'see') {
              return <button key={type} onClick={() => onClick(funcProps)} className='bg-neutral-800 text-white p-1 rounded-md'>
                <EyeIcon className='h-5 w-5' />
              </button>
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
