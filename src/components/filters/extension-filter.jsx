import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { appFetch } from '@/utils/fetchHandler'
import { BASE_OFERTA_URL } from '@/utils/consts'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { SelectInputWithLabel } from '../common/select-input/select-input-w-label'
import { unidad } from '@/utils/routes'

export function ExtensionFilter() {
  const [selectedTipo, setSelectedTipo] = useState(null)
  const [selectedUnidad, setSelectedUnidad] = useState(null)

  const selectedUnidadGlobal = useSelector(s => s.ofertaAcademica.extension.extension.selectedUnidad)
  const selectedTipoGlobal = useSelector(s => s.ofertaAcademica.extension.extension.selectedTipo)

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
  const {
    data: tiposData,
    laoding: tiposLoading,
    error: tiposError
  } = useFetchLocalData({ func: unidad.unidad.params })

  const { setExtensionSelectedUnidad, setExtensionError } = useOfertaAcademicaActions()

  useEffect(() => {
    if (errorUnidad) setExtensionError(errorUnidad)
  }, [errorUnidad])

  const unidades = useMemo(() => {
    if (!selectedTipo) return []
    return dataUnidad.filter(el => el.id_tipo_ua === selectedTipo.id_tipo_ua)
  }, [selectedTipo, dataUnidad])

  useEffect(() => {
    setExtensionSelectedUnidad({ unidad: selectedUnidad })
  }, [selectedUnidad])

  const handleTipoChange = tipo => {
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
          notFocusable
          labelText={'Tipo unidad'}
          loading={tiposLoading}
          externalValue={selectedTipo}
          ligatedToExternalChange
          error={tiposError}
          handleOptionClick={handleTipoChange}
          onFirstChange={handleTipoChange}
          rawOnChange={handleTipoChange}
          options={tiposData}
          show="nombre"
          firstOne
        />
      </div>
      <div className="flex flex-col w-full max-w-[190px]">
        <SelectInputWithLabel
          notFocusable
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
