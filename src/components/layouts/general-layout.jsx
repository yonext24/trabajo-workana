import { useSelector } from 'react-redux'
import { UserInfo } from '../common/user-info'

export function GeneralLayout({ children, text }) {
  const { logged } = useSelector(s => s.auth)

  return (
    <div id="page-container" className="flex flex-col flex-1 gap-y-4 w-full max-w-full overflow-x-hidden">
      <header className="w-full flex justify-between px-2 py-3 pl-12 md:py-8 md:pl-16 md:px-8">
        <h1 className="text-4xl">{text}</h1>
        {logged && <UserInfo />}
      </header>
      <div className="px-0 py-3 sm:px-3 bg-gris [&>main]:max-w-5xl [&>main]:mx-auto [&>main]:w-full [&>main]:flex-1 flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
