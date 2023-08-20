export function DefaultModalLayout ({ title, className, children }) {
  return <div className={`border-2 border-black flex flex-col w-full bg-white max-w-xl ${className ?? ''}`} onClick={e => e.stopPropagation()}>
    <header className="bg-azulfondo text-white py-1 text-center border-b-2 border-black">
      <span className="font-semibold">{title}</span>
    </header>
    {children}
  </div>
}
