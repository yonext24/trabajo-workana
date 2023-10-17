import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'
import { useDataActions } from '../../hooks/useDataActions'

export function Filter () {
  const complete = useSelector(s => s.data.dependencias.data)
  const sectoresData = useSelector(s => s.data.sectores.data)

  const { setDependenciasFiltered } = useDataActions()

  // El siguiente useMemo se encarga de obtener una lista (sin repeticiones, por eso el Set), de todos los sectores de los valores de la data
  const options = useMemo(() => {
    return ['Todos'].concat(sectoresData)
  }, [complete])

  const handleChange = (value) => {
    if (value === 'Todos') setDependenciasFiltered(complete)
    else setDependenciasFiltered(complete.filter(el => el.sector.toLowerCase() === value.toLowerCase()))
  }

  useEffect(() => {
    setDependenciasFiltered(complete)
  }, [complete])

  return <div className="flex flex-col gap-y-2 max-w-[200px] w-full">
    <span className='font-semibold'>Sector</span>
    <div className='w-full'>
      <SelectInput options={options} handleOptionClick={handleChange} firstOne />
    </div>
  </div>
}
