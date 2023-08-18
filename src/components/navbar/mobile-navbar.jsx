import { useSelector } from 'react-redux'
import { BarsIcon, LogoutIcon, XIcon } from '../icons'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { NavEntry, RawEntry } from './nav-entry'

export default function MobileNavbar ({ entrys }) {
  const { navbar } = useSelector(s => s.layout)
  const { setNavbarMobile } = useLayoutActions()

  return <>

    <div
      className='fixed top-6 left-6'
      id='button-nav-container'
    >
      <button onClick={() => { setNavbarMobile(true) }}>
        <BarsIcon className='h-8 w-8 text-black' />
      </button>

    </div>

    {
      navbar.mobile.open && <nav className='w-screen h-screen fixed top-0 left-0 bg-azulfondo animate-appear py-6 pb-0 px-4 flex flex-col'>
          <button className='fixed top-6 left-6' onClick={() => { setNavbarMobile(false) }}>
            <XIcon className='text-white h-8 w-8' />
          </button>

          <h4 className="font-bold text-xl text-white text-center">Registro y Estadística</h4>
          <div id='custom-scroll' className="flex-1 overflow-auto pt-6 pr-8 mt-10 max-w-xs mx-auto w-full">
            {
              entrys.map((el) => <NavEntry key={el.text} {...el} closeModal={() => { setNavbarMobile(false) }} />)
            }
          </div>
          <div className="py-5 border-t-2 border-neutral-400 max-w-xs mx-auto w-full">
            <span className='text-center font-bold text-white'>admin1</span>
            <RawEntry Icon={LogoutIcon} text={'Salir'} handleClick={() => {}} noArrow />
          </div>

      </nav>
    }

  </>
}
