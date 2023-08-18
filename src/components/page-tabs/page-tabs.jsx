import { useLocation } from 'react-router-dom'
import { Tab } from './tab'

export function PageTabs ({ tabs }) {
  const location = useLocation()

  return <section id='page-tabs' className="flex [&>a:last-of-type]:border-r-2">
    {
      tabs.map(el => <Tab key={el.text} {...el} isSelected={el.href === location.pathname} />)
    }
  </section>
}
