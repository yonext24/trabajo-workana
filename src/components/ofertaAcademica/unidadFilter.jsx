import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input'

export function UnidadFilter() {
  const completeData = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad.data)
  const { setUnidadFiltered } = useOfertaAcademicaActions()

  const options = useMemo(() => {
    const rawTipos = completeData.map(el => el.tipo_ua)
    const parsedTipos = Array.from(new Set(rawTipos))
    return ['Todos'].concat(parsedTipos)
  }, [completeData])

  const handleChange = value => {
    if (value === 'Todos') setUnidadFiltered(completeData)
    else setUnidadFiltered(completeData.filter(el => el.tipo_ua.toLowerCase() === value.toLowerCase()))
  }

  useEffect(() => {
    setUnidadFiltered(completeData)
  }, [completeData])

  return (
    <div className="flex flex-col gap-y-2 max-w-[300px] w-full gap-x-4">
      <span className="font-bold text-tab">Tipo UA</span>
      <div className="w-full">
        <SelectInput options={options} handleOptionClick={handleChange} firstOne />
      </div>
    </div>
  )
}
