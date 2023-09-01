import { useLocation } from 'react-router-dom'
import { LogoutIcon } from '../icons'
import { NavEntry, RawEntry } from './nav-entry'

export default function Navbar ({ entrys }) {
  const location = useLocation().pathname

  return <>
    <div className='w-[250px] max-[850px]:w-[210px] h-full' />
    <nav className="h-screen fixed top-0 left-0 bg-azulfondo text-white flex flex-col pt-10 pl-8 w-[250px] max-[850px]:w-[210px]">
      <h4 className="font-bold text-xl">Registro y Estadística</h4>
      <div id='custom-scroll' className="flex-1 overflow-auto pt-6 pr-8 mt-2">
        {
          entrys.map((el) => <NavEntry key={el.text} {...el} isSelected={el.includes ? location.includes(el.includes) : el?.href?.includes(location)} />)
        }
      </div>
      <div className="py-5 border-t-2 mr-8 border-neutral-400">
        <span className='text-center font-bold'>admin1</span>
        <RawEntry Icon={LogoutIcon} text={'Salir'} handleClick={() => {}} noArrow />
      </div>
    </nav>
  </>
}
