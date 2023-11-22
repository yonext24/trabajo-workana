import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { SelectInput } from '../common/select-input'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { appFetch } from '@/utils/fetchHandler'
import { BASE_OFERTA_URL } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'

export function ExtensionFilter() {
  const [selectedTipo, setSelectedTipo] = useState(null)
  const [selectedUnidad, setSelectedUnidad] = useState(null)

  const selectedUnidadGlobal = useSelector(s => s.ofertaAcademica.extension.selectedUnidad)
  const selectedTipoGlobal = useSelector(s => s.ofertaAcademica.extension.selectedTipo)

  console.log({ selectedUnidad })

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

  const { getUnidadAcademicaTipos, setExtensionSelectedUnidad } = useOfertaAcademicaActions()

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
    if (unidades.length <= 0) setSelectedUnidad(null)
    setSelectedUnidad(unidades[0])
  }, [unidades])

  useEffect(() => {
    setExtensionSelectedUnidad({ unidad: selectedUnidad })
  }, [selectedUnidad])

  useEffect(() => {
    getUnidadAcademicaTipos()
  }, [])

  const handleTipoChange = tipo => {
    if (tipo === undefined) return
    setSelectedTipo(tipo)
  }

  const handleUnidadChange = unidad => {
    setSelectedUnidad(unidad)
  }

  return (
    <div className="w-full flex flex-col gap-x-4 sm:justify-start sm:flex-row sm:items-end text-lg font-semibold">
      <div className="flex flex-col w-full max-w-[190px]">
        <label>Tipo unidad</label>
        <SelectInput
          loading={revalidatingTipo}
          externalValue={selectedTipo}
          ligatedToExternalChange
          error={errorTipo}
          handleOptionClick={handleTipoChange}
          onFirstChange={handleTipoChange}
          options={dataTipo}
          show="nombre"
          firstOne
        />
      </div>
      <div className="flex flex-col w-full max-w-[190px]">
        <label>Unidad</label>
        <SelectInput
          ligatedToExternalChange
          loading={loadingUnidad}
          error={errorUnidad}
          externalValue={selectedUnidad}
          onFirstChange={handleTipoChange}
          handleOptionClick={handleUnidadChange}
          options={unidades}
          show="abreviatura"
          disabled={unidades.length <= 0 || !selectedTipo}
          firstOne
        />
      </div>
    </div>
  )
}
