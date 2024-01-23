import { useUsuariosActions } from '@/hooks/useUsuariosActions'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input/select-input'

export function PermisosFilter({ outsideFunc = false, outsideData = false }) {
  const [currentOption, setCurrentOption] = useState('Todos')
  const permisosData = useSelector(s => s.usuarios.permisos.data)
  const { setPermisosFiltered } = useUsuariosActions()

  const dataToUse = useMemo(() => {
    if (outsideData) return outsideData
    else return permisosData
  }, [outsideData, permisosData])
  const funcToUse = useMemo(() => {
    if (outsideFunc) return outsideFunc
    else return setPermisosFiltered
  }, [outsideFunc, setPermisosFiltered])

  const hasChangeOfThisOptionOcurred = useRef({ option: currentOption, state: false })
  useEffect(() => {
    if (hasChangeOfThisOptionOcurred.current.option === currentOption && hasChangeOfThisOptionOcurred.state) return
    hasChangeOfThisOptionOcurred.current = { option: currentOption, state: true }

    if (currentOption === 'Todos') funcToUse(dataToUse)
    else funcToUse(dataToUse.filter(el => el.modulo.toLowerCase() === currentOption.toLowerCase()))
  }, [dataToUse, currentOption, funcToUse])

  const options = useMemo(() => {
    const allModulos = permisosData.map(el => el.modulo)
    const uniqueModulos = [...new Set(allModulos)]

    return ['Todos'].concat(uniqueModulos)
  }, [permisosData])

  const handleChange = value => {
    setCurrentOption(value)
    if (!outsideData) return
    const funcToUse = outsideFunc
    if (value === 'Todos') funcToUse(dataToUse)
    else funcToUse(dataToUse.filter(el => el.modulo.toLowerCase() === value.toLowerCase()))
  }

  useEffect(() => {
    if (!outsideData || !currentOption.current) return
    handleChange(currentOption)
  }, [outsideData])

  return (
    <div
      className="flex flex-col gap-y-2 max-w-[300px] w-full gap-x-4"
      style={outsideFunc ? { flexDirection: 'row' } : {}}
    >
      <span className="font-semibold text-start">Módulo</span>
      <div className="w-full">
        <SelectInput
          notFocusable
          options={options}
          handleOptionClick={handleChange}
          onFirstChange={handleChange}
          firstOne
        />
      </div>
    </div>
  )
}
