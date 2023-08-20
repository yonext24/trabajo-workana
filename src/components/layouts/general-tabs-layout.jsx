import { useSelector } from 'react-redux'
import { PageTabs } from '../page-tabs/page-tabs'
import { ReactPortal } from '../modals/react-portal'

const tabs = {
  general: [
    { text: 'Sectores', href: '/general/sectores' },
    { text: 'Dependencias', href: '/general/dependencias' },
    { text: 'Puestos', href: '/general/puestos' },
    { text: 'Modulos', href: '/general/modulos' }
  ],
  usuarios: [
    { text: 'Roles', href: '/usuarios/roles' },
    { text: 'Permisos', href: '/usuarios/permisos' },
    { text: 'Usuarios', href: '/usuarios/usuarios' }
  ]
}

export function GeneralTabsLayout ({ tabsName, children }) {
  const { modals } = useSelector(s => s.layout)

  return <>
    <main className="flex flex-col bg-white rounded-2xl [&>#page-content]:pb-6 py-4 gap-y-6 [&>#page-content]:px-2 [&>#page-content]:md:px-8 [&>#page-content]:flex [&>#page-content]:flex-col
    [&>#page-content]:gap-y-8 px-1 md:px-4 relative">
      <PageTabs tabs={tabs[tabsName]} />
      { children }

    </main>
    <ReactPortal wrapperId='general-portal-wrapper'>
      {
        modals.map(({ Element, id, props }) => <Element key={id} {...props} />)
      }
    </ReactPortal>
  </>
}
