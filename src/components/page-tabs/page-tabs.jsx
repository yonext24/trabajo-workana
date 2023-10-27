import { useLocation } from 'react-router-dom'
import { Tab } from './tab'

export function PageTabs({ tabs }) {
  const location = useLocation()

  return (
    <section
      id="page-tabs"
      className="flex flex-wrap align-center sm:justify-start justify-center gap-y-2 [&>a:last-of-type]:border-r-
  [&>a:first-of-type]:border-l-2"
    >
      {tabs.map(el => (
        <Tab key={el.text} {...el} isSelected={el.href === location.pathname} />
      ))}
    </section>
  )
}
