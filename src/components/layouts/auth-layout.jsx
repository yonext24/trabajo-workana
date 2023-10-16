export function AuthLayout ({ children }) {
  return <div id='auth-layout' className={'flex flex-1 flex-col'}>
    <header className="bg-azulfondo text-white font-semibold flex justify-between items-center px-6 py-10">
      <h2 className="text-2xl font-semibold">Area Administrativa departamento de Registro y Estadística</h2>
      <div className="h-16 w-32 bg-white rounded-md" />
    </header>
    {children}

  </div>
}
