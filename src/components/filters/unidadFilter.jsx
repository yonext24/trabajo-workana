import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { SelectInput } from '../common/select-input/select-input'
import { preventDuplicatesInArray } from '@/utils/consts'

export function UnidadFilter() {
  const [currentOption, setCurrentOption] = useState('Todos')
  const completeData = useSelector(s => s.ofertaAcademica.unidadAcademica.unidad.data)
  const { setUnidadFiltered } = useOfertaAcademicaActions()

  const options = useMemo(() => {
    const rawTipos = completeData.map(({ tipo_ua, id_tipo_ua }) => ({ tipo_ua, id_tipo_ua }))
    const tipos = preventDuplicatesInArray(rawTipos, 'id_tipo_ua')
    return ['Todos'].concat(tipos)
  }, [completeData])

  const handleChange = value => {
    if (value === 'Todos') setCurrentOption(value)
    else setCurrentOption(value.id_tipo_ua)
  }

  const hasChangeOfThisOptionOcurred = useRef({ option: currentOption, state: false })

  useEffect(() => {
    if (hasChangeOfThisOptionOcurred.current.option === currentOption && hasChangeOfThisOptionOcurred.state) return
    hasChangeOfThisOptionOcurred.current = { option: currentOption, state: true }

    if (currentOption === 'Todos') setUnidadFiltered(completeData)
    else setUnidadFiltered(completeData.filter(el => el.id_tipo_ua === currentOption))
  }, [completeData, currentOption])

  return (
    <div className="flex flex-col gap-y-2 max-w-[300px] w-full gap-x-4">
      <span className="font-bold text-tab">Tipo UA</span>
      <div className="w-full">
        <SelectInput notFocusable options={options} show="tipo_ua" handleOptionClick={handleChange} firstOne />
      </div>
    </div>
  )
}
