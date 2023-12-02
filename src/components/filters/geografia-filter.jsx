import { useGeografiaActions } from '@/hooks/useGeografiaActions'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { SelectInputWithLabel } from '../common/select-input-w-label'
import { InputWLabel } from '../common/input-w-label'

export function GeografiaFilter() {
  const { setGeoPaginationData, getGeoParams, getGeoMunicipios } = useGeografiaActions()

  const paises = useSelector(s => s.geografia.paises)
  const departamentos = useSelector(s => s.geografia.departamentos)
  const loading = useSelector(s => s.geografia.revalidating)
  const paginationData = useSelector(s => s.geografia.paginationData)
  const error = useSelector(s => s.geografia.error)
  const { selectedPais, selectedDepartamento, size, page } = paginationData

  useEffect(() => {
    getGeoParams()
  }, [])

  useEffect(() => {
    if (!selectedPais || !departamentos) return
    setGeoPaginationData({ departamento: departamentos[0] })
  }, [selectedPais])

  useEffect(() => {
    if (!selectedPais) return
    const { selectedDepartamento, page, size } = paginationData
    getGeoMunicipios({ departamento: selectedDepartamento?.id_departamento, page, size })
  }, [selectedDepartamento, size, page])

  const departamentosOptions = useMemo(() => {
    if (!selectedPais) return []
    return departamentos.filter(el => el.id_pais === selectedPais.id_pais)
  }, [selectedPais])

  const handlePaisClick = pais => {
    setGeoPaginationData({ pais })
  }
  const handleDepartamentoClick = departamento => {
    setGeoPaginationData({ departamento })
  }

  return (
    <div className="flex-1 grid grid-cols-[200px,200px] gap-4 [&>*]:flex [&>*]:flex-col [&>*]:w-full">
      <SelectInputWithLabel
        labelText={'País'}
        options={paises}
        firstOne
        ligatedToExternalChange
        externalValue={selectedPais}
        handleOptionClick={handlePaisClick}
        onFirstChange={handlePaisClick}
        loading={loading}
        error={error}
        show="nombre"
      />
      <SelectInputWithLabel
        labelText={'Departamento'}
        options={departamentosOptions}
        firstOne
        ligatedToExternalChange
        externalValue={selectedDepartamento}
        show="nombre"
        handleOptionClick={handleDepartamentoClick}
        onFirstChange={handleDepartamentoClick}
        loading={loading}
        resetOnOptionsChange
        error={error}
      />
      <div className="col-start-1 col-end-3 row-span-2 w-full [&>*]:flex-1 flex">
        {selectedPais && <InputWLabel noLabel value={selectedPais.nacionalidad} disabled />}
      </div>
    </div>
  )
}
