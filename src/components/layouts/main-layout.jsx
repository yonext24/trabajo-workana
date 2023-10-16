import React, { Suspense, useEffect, lazy } from 'react'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { useSelector } from 'react-redux'
import { PersonIcon, PersonsIcon, AcademyIcon, GraduateIcon, HomeIcon, VerifiedIcon, ReportsIcon, PlanetIcon } from '../icons'
import { NavbarFallback } from '../fallbacks/navbar-fallback'
import { useLocation } from 'react-router-dom'

const NavbarLazy = lazy(() => import('../navbar/navbar'))
const MobileNavbarLazy = lazy(() => import('../navbar/mobile-navbar'))

const navbarEntrys = [
  { text: 'General', Icon: PersonIcon, href: '/general/sectores', includes: '/general/', permissionName: 'GENERAL' },
  { text: 'Usuarios', Icon: PersonsIcon, href: '/usuarios/roles', includes: '/usuarios/', permissionName: 'USUARIOS' },
  {
    text: 'Oferta Academica',
    includes: 'oferta-academica',
    Icon: AcademyIcon,
    permissionName: 'OFERTA_ACADEMICA',
    sub: [
      { text: 'Unidad Academica', Icon: GraduateIcon, href: '/oferta-academica/unidad/tipo' },
      { text: 'Extensión', Icon: HomeIcon, href: '/oferta-academica/extension' },
      { text: 'Carrera', Icon: VerifiedIcon, href: '/oferta-academica/carrera/nivel' }
    ]
  },
  { text: 'Reportes', Icon: ReportsIcon, href: '/reportes', includes: '/reportes', permissionName: 'REPORTES' },
  { text: 'Centros Educativos', Icon: HomeIcon, href: '/centros', includes: '/centros', permissionName: 'CENTROS_EDUCATIVOS' },
  { text: 'Geografía', Icon: PlanetIcon, href: '/geografia', includes: '/geografia', permissionName: 'GEOGRAFICO' }

]

export function MainLayout ({ children }) {
  const { setScreenWidth } = useLayoutActions()
  const { screenWidth } = useSelector(s => s.layout)

  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    setScreenWidth(window.innerWidth)

    const handleResize = (e) => {
      const target = e.target

      setScreenWidth(target.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [])
  if (location.pathname === '/login') return children

  return <div id='main-layout' className={`flex flex-1 max-w-full justify-between flex-row-reverse ${screenWidth.isMobile ? 'flex-col-reverse' : ''}`}>

    {children}

    <Suspense fallback={<NavbarFallback />} >
      {
       screenWidth.isMobile === false && <NavbarLazy entrys={navbarEntrys} />
      }
    </Suspense>
    <Suspense fallback={<></>}>
      {
        screenWidth.isMobile === true && <MobileNavbarLazy entrys={navbarEntrys} />
      }
    </Suspense>
  </div>
}
