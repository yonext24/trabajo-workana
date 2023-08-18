import { useSelector } from 'react-redux'
import { PageTabs } from '../page-tabs/page-tabs'
import { ReactPortal } from '../modals/react-portal'

const generalPageTabs = [
  { text: 'Sectores', href: '/general/sectores' },
  { text: 'Dependencias', href: '/general/dependencias' },
  { text: 'Puestos', href: '/general/puestos' },
  { text: 'Modulos', href: '/general/modulos ' }
]

export function GeneralTabsLayout ({ children }) {
  const { modals } = useSelector(s => s.layout)

  return <>
    <main className="flex flex-col bg-white rounded-2xl py-4 px-4 gap-y-6 [&>#page-content]:px-8 [&>#page-content]:flex [&>#page-content]:flex-col [&>#page-content]:gap-y-8">
      <PageTabs tabs={generalPageTabs} />
      { children }

    </main>
    <ReactPortal wrapperId='general-portal-wrapper'>
      {
        modals.map(({ Element, id, props }) => <Element key={id} {...props} />)
      }
    </ReactPortal>
  </>
}
