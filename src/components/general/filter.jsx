import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'
import { useDataActions } from '../../hooks/useDataActions'

export function Filter () {
  const { general: { dependencias: { data: { complete } } } } = useSelector(s => s.data)

  const { setGeneralDependenciesFilteredData } = useDataActions()

  // El siguiente useMemo se encarga de obtener una lista (sin repeticiones, por eso el Set), de todos los sectores de los valores de la data
  const options = useMemo(() => {
    return [{ text: 'Todas', value: 'all' }]
      .concat([...new Set(complete.map(el => { return el.sector }))].map(el => ({ text: el, value: el })))
  }, [complete])

  const handleChange = ({ value }) => {
    if (value === 'all') setGeneralDependenciesFilteredData(complete)
    else setGeneralDependenciesFilteredData(complete.filter(el => el.sector === value))
  }

  useEffect(() => {
    setGeneralDependenciesFilteredData(complete)
  }, [])
  return <div className="flex flex-col gap-y-2 max-w-[200px] w-full">
    <span className='font-semibold'>Sector</span>
    <div className='w-full'>
      <SelectInput options={options} handleOptionClick={handleChange} />
    </div>
  </div>
}
