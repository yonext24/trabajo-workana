import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'
import { useDataActions } from '@/hooks/useDataActions'

export function PermisosFilter({ outsideFunc = false, outsideData = false }) {
  const modulosData = useSelector(s => s.data.modulos.data)
  const permisosData = useSelector(s => s.usuarios.permisos.data)
  const { setPermisosFiltered } = useUsuariosActions()
  const { getModulos } = useDataActions()

  const dataToUse = useMemo(() => {
    // not sure if its the best use an useMemo here tbh
    if (outsideData) return outsideData
    else return permisosData
  }, [outsideData, permisosData])

  const options = useMemo(() => {
    return ['Todos'].concat(modulosData.filter(el => el.tipo === 'Módulo').map(el => el.nombre))
  }, [modulosData])

  const currentOption = useRef('Todos')

  const handleChange = value => {
    currentOption.current = value
    const funcToUse = outsideFunc || setPermisosFiltered
    if (value === 'Todos') funcToUse(dataToUse)
    else funcToUse(dataToUse.filter(el => el.modulo.toLowerCase() === value.toLowerCase()))
  }

  useEffect(() => {
    if (!outsideData || !currentOption.current) return
    handleChange(currentOption.current)
  }, [outsideData])

  useEffect(() => {
    getModulos()
  }, [])

  useEffect(() => {
    setPermisosFiltered(dataToUse)
  }, [dataToUse])

  return (
    <div
      className="flex flex-col gap-y-2 max-w-[300px] w-full items-center gap-x-4"
      style={outsideFunc ? { flexDirection: 'row' } : {}}
    >
      <span className="font-semibold">Modulo</span>
      <div className="w-full">
        <SelectInput options={options} handleOptionClick={handleChange} firstOne />
      </div>
    </div>
  )
}
