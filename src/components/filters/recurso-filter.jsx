import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { SelectInput } from '../common/select-input/select-input'
import { useSelector } from 'react-redux'
import { useEffect, useMemo, useRef, useState } from 'react'

export function RecursoFilter() {
  const [currentOption, setCurrentOption] = useState('Todos')
  const hasChangeOfThisOptionOcurred = useRef({ option: currentOption, state: false })

  const {
    data: tipoRecursoData,
    error: tipoRecursoError,
    revalidating: tipoRecursoLoading
  } = useSelector(s => s.ofertaAcademica.carrera.tipo_recurso)
  const recursoData = useSelector(s => s.ofertaAcademica.carrera.recurso.data)

  const { setRecursoFiltered } = useOfertaAcademicaActions()

  useEffect(() => {
    if (hasChangeOfThisOptionOcurred.current.option === currentOption && hasChangeOfThisOptionOcurred.state) return
    hasChangeOfThisOptionOcurred.current = { option: currentOption, state: true }

    if (currentOption === 'Todos') setRecursoFiltered(recursoData)
    else setRecursoFiltered(recursoData.filter(el => el.id_tipo_recurso === currentOption))
  }, [recursoData, currentOption])

  // El siguiente useMemo se encarga de obtener una lista (sin repeticiones, por eso el Set), de todos los sectores de los valores de la data
  const options = useMemo(() => {
    return ['Todos'].concat(tipoRecursoData)
  }, [recursoData])

  const handleChange = value => {
    if (value === 'Todos') setCurrentOption(value)
    else setCurrentOption(value.id_tipo_recurso)
  }

  return (
    <div className="flex flex-col w-full max-w-[200px]">
      <label className="font-semibold text-lg">Tipo</label>
      <SelectInput
        notFocusable
        handleOptionClick={handleChange}
        loading={tipoRecursoLoading}
        error={tipoRecursoError}
        show="nombre"
        options={options}
      />
    </div>
  )
}
