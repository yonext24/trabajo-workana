import { UserInfo } from '../common/user-info'

export function GeneralLayout ({ children, text }) {
  return <div id='page-container' className="flex flex-col flex-1 gap-y-4 w-full max-w-full overflow-x-hidden">
    <header className="w-full flex justify-between py-8 pl-16 px-8">
      <h1 className="text-4xl">{text}</h1>
      <UserInfo />
    </header>
    <div className='p-3 bg-gris [&>main]:max-w-5xl [&>main]:mx-auto [&>main]:w-full [&>main]:flex-1 flex-1 flex flex-col'>
      {children}
    </div>
  </div>
}
