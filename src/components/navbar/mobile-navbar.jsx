import { useSelector } from 'react-redux'
import { BarsIcon, LogoutIcon, XIcon } from '../icons'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { NavEntry, RawEntry } from './nav-entry'
import { useAuthActions } from '@/hooks/useAuthActions'
import { useModalLogic } from '@/hooks/useModalLogic'

export default function MobileNavbar ({ entrys }) {
  const open = useSelector(s => s.layout.navbar.mobile.open)
  const { setNavbarMobile } = useLayoutActions()

  return <>

    <div
      className='fixed top-0 left-0 p-1 flex text-white'
      id='button-nav-container'
    >
      <div className={`w-full h-full relative before:bg-azulfondo before:rounded-full before:aspect-square before:absolute
      before:top-[-50px] before:left-[-50px] before:w-[100px] before:h-[100px] be
        ${
          !open
          ? ''
          : 'before:scale-[10]'
        } 
        before:flex before:transition-all before:duration-200`}>
        <button className='h-14 w-14 flex items-start justify-start relative' onClick={() => { setNavbarMobile(true) }}>
          <BarsIcon className='h-8 w-8' />
        </button>
      </div>

    </div>

    {
      open && <MobileNav entrys={entrys} closeModal={() => { setNavbarMobile(false) }} />
    }

  </>
}

function MobileNav ({ entrys, closeModal }) {
  const { Logout } = useAuthActions()
  const user = useSelector(s => s.auth.user)
  useModalLogic({ closeModal, noScroll: true })

  return <nav className='w-screen h-screen fixed top-0 left-0 bg-azulfondo animate-appear py-6 pb-0 px-4 flex flex-col'>
  <button className='fixed top-6 left-6' onClick={closeModal}>
    <XIcon className='text-white h-8 w-8' />
  </button>

  <h4 className="font-bold text-xl text-white text-center">Registro y Estadística</h4>
  <div id='custom-scroll' className="flex-1 overflow-auto pt-6 pr-8 mt-10 max-w-xs mx-auto w-full">
    {
      entrys.map((el) => <NavEntry key={el.text} {...el} closeModal={closeModal} />)
    }
  </div>
  <div className="py-5 border-t-2 border-neutral-400 max-w-xs mx-auto w-full">
    <span className='text-center font-bold text-white'>{user?.usuario}</span>
    <RawEntry Icon={LogoutIcon} text={'Salir'} handleClick={Logout} noArrow />
  </div>

</nav>
}
