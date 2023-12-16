import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { appFetch } from '@/utils/fetchHandler'
import { BASE_OFERTA_URL } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { SelectInputWithLabel } from '../common/select-input/select-input-w-label'

export function ExtensionFilter() {
  const [selectedTipo, setSelectedTipo] = useState(null)
  const [selectedUnidad, setSelectedUnidad] = useState(null)

  const selectedUnidadGlobal = useSelector(s => s.ofertaAcademica.extension.selectedUnidad)
  const selectedTipoGlobal = useSelector(s => s.ofertaAcademica.extension.selectedTipo)

  useEffect(() => {
    if (selectedUnidadGlobal) setSelectedUnidad(selectedUnidadGlobal)
    if (selectedTipoGlobal) setSelectedTipo(selectedTipoGlobal)
  }, [selectedUnidadGlobal, selectedTipoGlobal])

  const {
    loading: loadingUnidad,
    error: errorUnidad,
    data: dataUnidad
  } = useFetchLocalData({
    func: async () => await appFetch(`${BASE_OFERTA_URL}/rye/extension/param_leer`)
  })

  const { getUnidadAcademicaTipos, setExtensionSelectedUnidad, setExtensionError } = useOfertaAcademicaActions()

  useEffect(() => {
    if (errorUnidad) setExtensionError(errorUnidad)
  }, [errorUnidad])

  /* Los datos de los tipos vienen del estado global por que el endpoint de param_leer no los ofrece */
  const {
    data: dataTipo,
    revalidating: revalidatingTipo,
    error: errorTipo
  } = useSelector(s => s.ofertaAcademica.unidadAcademica.tipo)

  const unidades = useMemo(() => {
    if (!selectedTipo) return []
    return dataUnidad.filter(el => el.id_tipo_ua === selectedTipo.id_tipo_ua)
  }, [selectedTipo, dataUnidad])

  useEffect(() => {
    setExtensionSelectedUnidad({ unidad: selectedUnidad })
  }, [selectedUnidad])

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  const handleTipoChange = tipo => {
    console.log(tipo)
    if (tipo === undefined) return
    setSelectedTipo(tipo)
  }
  const handleUnidadChange = unidad => {
    if (unidad === undefined) return
    setSelectedUnidad(unidad)
  }

  return (
    <div
      className="w-full flex flex-col gap-x-4 sm:justify-start sm:flex-row sm:items-end text-lg font-semibold md:max-[1000px]:flex-col
    md:max-[1000px]:items-start"
    >
      <div className="flex flex-col w-full max-w-[190px]">
        <SelectInputWithLabel
          labelText={'Tipo unidad'}
          loading={revalidatingTipo}
          externalValue={selectedTipo}
          ligatedToExternalChange
          error={errorTipo}
          handleOptionClick={handleTipoChange}
          onFirstChange={handleTipoChange}
          rawOnChange={handleTipoChange}
          options={dataTipo}
          show="nombre"
          firstOne
        />
      </div>
      <div className="flex flex-col w-full max-w-[190px]">
        <SelectInputWithLabel
          labelText="Unidad"
          noOptionsMessage={`No hay unidades para el tipo ${selectedTipo?.nombre ?? ''}`}
          ligatedToExternalChange
          loading={loadingUnidad}
          error={errorUnidad}
          externalValue={selectedUnidad}
          onFirstChange={handleUnidadChange}
          handleOptionClick={handleUnidadChange}
          rawOnChange={handleUnidadChange}
          options={unidades}
          show="abreviatura"
          disabled={!selectedTipo}
          firstOne
          resetOnOptionsChange
        />
      </div>
    </div>
  )
}
