import {
  AddCarreraButton,
  DeactivateButton,
  PermissionsButton,
  SeeButton,
  SwitchButton,
  UpdateButton
} from '../common/table-buttons'
import { RecycleIcon } from '../icons'

export function Row({ text, actions = false, carreras = false, funcProps, className }) {
  return (
    <td className={`border-r ${className ?? ''}`}>
      {actions ? (
        <div className="w-full h-full flex justify-center items-center gap-4">
          {actions.map(({ type, onClick, ...props }) => {
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
            if (type === 'switch') {
              return <SwitchButton key={type} handleClick={() => onClick(funcProps)} {...props} />
            }
            return null
          })}
        </div>
      ) : carreras ? (
        <div className="w-full h-full flex justify-center items-center gap-4">
          {carreras.map(({ type, onClick, ...props }) => {
            if (type === 'add') {
              return <AddCarreraButton key={type} handleClick={() => onClick(funcProps)} {...props} />
            }
            if (type === 'see') {
              return (
                <button
                  key={type}
                  onClick={() => onClick(funcProps)}
                  className="bg-red-500 text-white p-1 rounded-full"
                >
                  <RecycleIcon className="h-5 w-5" />
                </button>
              )
            }
            return null
          })}
        </div>
      ) : (
        text
      )}
    </td>
  )
}
