import { useSelector } from 'react-redux'
import { DownArrowIcon, UserIcon } from '../icons'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useClickOutside } from '@/hooks/useClickOutside'

export function UserInfo() {
  const [open, setOpen] = useState(false)

  const user = useSelector(s => s.auth.user)

  const { Logout } = useAuthActions()

  return (
    <div className="relative">
      <button id="user-info" className="flex gap-3 items-center cursor-pointer" onClick={() => setOpen(prev => !prev)}>
        <div id="user-image" className="rounded-full overflow-hidden">
          <UserIcon className="h-10 w-10" />
        </div>
        <p className="font-semibold text-xl">{user?.usuario}</p>
        <div className="ml-5">
          <DownArrowIcon className="h-4 w-4" />
        </div>
      </button>
      {open && (
        <Menu
          close={() => {
            setOpen(false)
          }}
          Logout={Logout}
        />
      )}
    </div>
  )
}

function Menu({ close, Logout }) {
  const menuRef = useRef()

  useClickOutside(menuRef, close)

  return (
    <div
      ref={menuRef}
      className="absolute bottom-0 right-0 w-max translate-y-full border border-black rounded-md flex flex-col bg-white z-50
      font-semibold py-2 [&>*]:pl-4 [&>*]:pr-2 "
    >
      <Link to="/perfil" className="hover:bg-gris">
        Perfil
      </Link>
      <Link to="/cambiar-contraseña" className="mb-2 mt-1 hover:bg-gris">
        Cambiar Contraseña
      </Link>

      <button onClick={Logout} className="border-t border-black hover:bg-gris text-start mt-2">
        Salir
      </button>
    </div>
  )
}
