import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'
import { useDataActions } from '@/hooks/useDataActions'

export function PermisosFilter({ outsideFunc = false }) {
  const { data: modulosData } = useSelector(s => s.data.modulos)
  const { data: permisosData } = useSelector(s => s.usuarios.permisos)
  const { setPermisosFiltered } = useUsuariosActions()
  const { getModulos } = useDataActions()

  const options = useMemo(() => {
    return ['Todos'].concat(
      modulosData.filter(el => el.tipo === 'Módulo').map(el => el.nombre)
    )
  }, [modulosData])

  const handleChange = value => {
    const funcToUse = outsideFunc || setPermisosFiltered
    if (value === 'Todos') funcToUse(permisosData)
    else
      funcToUse(
        permisosData.filter(
          el => el.modulo.toLowerCase() === value.toLowerCase()
        )
      )
  }

  useEffect(() => {
    getModulos()
  }, [])

  useEffect(() => {
    setPermisosFiltered(permisosData)
  }, [permisosData])

  return (
    <div
      className="flex flex-col gap-y-2 max-w-[300px] w-full items-center gap-x-4"
      style={outsideFunc ? { flexDirection: 'row' } : {}}
    >
      <span className="font-semibold">Modulo</span>
      <div className="w-full">
        <SelectInput
          options={options}
          handleOptionClick={handleChange}
          firstOne
        />
      </div>
    </div>
  )
}
