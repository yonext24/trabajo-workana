import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input/select-input'
import { useDataActions } from '../../hooks/useDataActions'

export function DependenciasFilter() {
  const complete = useSelector(s => s.data.dependencias.data)
  const { data: sectoresData, loading, error } = useSelector(s => s.data.sectores)
  const { setDependenciasFiltered, getSectoresData } = useDataActions()
  const [currentOption, setCurrentOption] = useState('Todos')

  const hasChangeOfThisOptionOcurred = useRef({ option: currentOption, state: false })

  useEffect(() => {
    if (hasChangeOfThisOptionOcurred.current.option === currentOption && hasChangeOfThisOptionOcurred.state) return
    hasChangeOfThisOptionOcurred.current = { option: currentOption, state: true }

    if (currentOption === 'Todos') setDependenciasFiltered(complete)
    else setDependenciasFiltered(complete.filter(el => el.id_sector === currentOption))
  }, [complete, currentOption])

  // El siguiente useMemo se encarga de obtener una lista (sin repeticiones, por eso el Set), de todos los sectores de los valores de la data
  const options = useMemo(() => {
    return ['Todos'].concat(sectoresData)
  }, [complete])

  const handleChange = value => {
    if (value === 'Todos') setCurrentOption(value)
    else setCurrentOption(value.id_sector)
  }

  useEffect(() => {
    getSectoresData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2 max-w-[200px] w-full">
      <span className="font-semibold">Sector</span>
      <div className="w-full">
        <SelectInput
          options={options}
          show={'nombre'}
          loading={loading}
          error={error}
          handleOptionClick={handleChange}
          firstOne
        />
      </div>
    </div>
  )
}
