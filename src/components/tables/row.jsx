import { KeyIcon, PenIcon, TrashIcon } from '../icons'

export function Row ({ text, actions = false, funcProps, className }) {
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
            return null
          })
        }
      </div>
        : text
    }
  </td>
}
