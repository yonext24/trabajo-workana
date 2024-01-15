import { useFetchLocalData } from '@/hooks/useFetchLocalData'
import { SelectInputWithLabel } from '../common/select-input/select-input-w-label'
import { centros, geografia } from '@/utils/routes'
import { useCentrosEducativosActions } from '@/hooks/useCentrosEducativosActions'
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'

const getCentrosEducativosFilterData = async () => {
  const geoData = await geografia.get_departamentos_municipios_guatemala()
  const sectores = await centros.get_sectores()

  return { ...geoData, sectores }
}

export function CentrosEducativosFilter() {
  const { size, page, selectedDepartamento, selectedMunicipio, selectedSector, shouldRevalidate } = useSelector(
    s => s.centrosEducativos.paginationData
  )
  const {
    loading: loadingParams,
    error: errorParams,
    data: dataParams
  } = useFetchLocalData({
    func: getCentrosEducativosFilterData,
    initialData: { departamentos: [], municipios: [], sectores: [] },
    dependencies: [shouldRevalidate]
  })
  const { departamentos, municipios, sectores } = dataParams
  const { getCentrosEstablecimientos, setPaginationData } = useCentrosEducativosActions()

  useEffect(() => {
    if (!selectedDepartamento || !selectedMunicipio || !selectedSector) return
    void getCentrosEstablecimientos({
      id_departamento: selectedDepartamento.id_departamento,
      id_municipio: selectedMunicipio.id_municipio,
      id_sector: selectedSector.id_sector,
      page,
      size
    })
  }, [
    selectedDepartamento?.id_departamento,
    selectedMunicipio?.id_municipio,
    selectedSector?.id_sector,
    shouldRevalidate
  ])

  const availableMunicipios = useMemo(() => {
    if (!selectedDepartamento) return []
    return dataParams.municipios.filter(m => m.id_departamento === selectedDepartamento.id_departamento)
  }, [selectedDepartamento, municipios])

  const handleDepartamentoChange = departamento => {
    setPaginationData({ selectedDepartamento: departamento })
  }
  const handleMunicipioChange = municipio => {
    setPaginationData({ selectedMunicipio: municipio })
  }
  const handleSectorChange = sector => {
    setPaginationData({ selectedSector: sector })
  }

  return (
    <div
      className="w-full flex flex-col gap-4 justify-start items-start text-lg font-semibold  md:max-[1000px]:flex-col
    md:max-[1000px]:items-start"
    >
      <div className="flex gap-4 w-full md:max-[1000px]:flex-col">
        <div className="flex flex-col w-full md:max-w-[190px]">
          <SelectInputWithLabel
            notFocusable
            labelText={'Departamento'}
            loading={loadingParams}
            externalValue={selectedDepartamento}
            ligatedToExternalChange
            error={errorParams}
            options={departamentos}
            handleOptionClick={handleDepartamentoChange}
            onFirstChange={handleDepartamentoChange}
            show="nombre"
            firstOne
          />
        </div>
        <div className="flex flex-col w-full md:max-w-[190px]">
          <SelectInputWithLabel
            notFocusable
            labelText="Municipio"
            noOptionsMessage={`No hay municipios para el departamento ${selectedDepartamento?.nombre}`}
            ligatedToExternalChange
            handleOptionClick={handleMunicipioChange}
            onFirstChange={handleMunicipioChange}
            firstOne
            loading={loadingParams}
            error={errorParams}
            externalValue={selectedMunicipio}
            options={availableMunicipios}
            show="nombre"
          />
        </div>
      </div>
      <div className="flex flex-col w-full md:max-w-[190px] ">
        <SelectInputWithLabel
          notFocusable
          labelText="Sector"
          noOptionsMessage={`No encontramos ningún sector.`}
          ligatedToExternalChange
          handleOptionClick={handleSectorChange}
          onFirstChange={handleSectorChange}
          firstOne
          loading={loadingParams}
          error={errorParams}
          externalValue={selectedSector}
          options={sectores}
          show="nombre"
        />
      </div>
    </div>
  )
}
