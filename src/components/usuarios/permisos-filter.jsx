import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'

export function PermisosFilter ({ outsideFunc = false }) {
  const { data: { general: { modulos: { data: modulosData } } }, usuarios: { permisos: { data: permisosData } } } = useSelector(s => s)
  const { setPermisosFiltered } = useUsuariosActions()

  const options = useMemo(() => {
    return ['all'].concat(modulosData)
  }, [modulosData])

  const handleChange = (value) => {
    const funcToUse = outsideFunc || setPermisosFiltered
    if (value === 'all') funcToUse(permisosData)
    else funcToUse(permisosData.filter(el => el.modulo.toLowerCase() === value.toLowerCase()))
  }

  useEffect(() => {
    setPermisosFiltered(permisosData)
  }, [permisosData])

  return <div className="flex flex-col gap-y-2 max-w-[300px] w-full items-center gap-x-4" style={ outsideFunc ? { flexDirection: 'row' } : {} }>
    <span className='font-semibold'>Modulo</span>
    <div className='w-full'>
      <SelectInput options={options} handleOptionClick={handleChange} firstOne />
    </div>
  </div>
}
