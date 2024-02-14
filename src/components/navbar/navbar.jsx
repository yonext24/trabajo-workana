import { useLocation } from 'react-router-dom'
import { LogoutIcon } from '../icons'
import { NavEntry, RawEntry } from './nav-entry'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useSelector } from 'react-redux'

export default function Navbar({ entrys }) {
  const location = useLocation().pathname
  const { Logout } = useAuthActions()
  const user = useSelector(s => s.auth.user)

  return (
    <>
      <div className="w-[200px] h-full" />
      <nav className="h-screen fixed top-0 left-0 bg-azulfondo text-white flex flex-col pt-10 pl-8 w-[200px]">
        <h4 className="font-bold text-base">Registro y Estadística</h4>
        <div id="custom-scroll" className="flex-1 overflow-auto pt-6 pr-8 mt-2">
          {entrys.map(el => (
            <NavEntry
              key={el.text}
              {...el}
              isSelected={el.includes ? location.includes(el.includes) : el?.href?.includes(location)}
            />
          ))}
        </div>
        <div className="py-5 border-t-2 mr-8 border-neutral-400">
          <span className="text-center font-bold">{user?.usuario}</span>
          <RawEntry Icon={LogoutIcon} text={'Salir'} handleClick={Logout} noArrow />
        </div>
      </nav>
    </>
  )
}
