import { SelectInput } from '../common/select-input/select-input'
import { useOfertaAcademicaActions } from '@/hooks/useOfertaAcademicaActions'
import { useEffect } from 'react'
import { carrera } from '@/utils/routes/oferta/carrera'
import { useFetchLocalData } from '@/hooks/useFetchLocalData'

export function CarreraFilter() {
  const {
    loading: nivelesLoading,
    error: nivelesError,
    data: nivelesData
  } = useFetchLocalData({
    func: carrera.carrera.param_leer
  })

  const { setCarreraCarreraPaginationData, getCarreraNivelData, setCarreraError } = useOfertaAcademicaActions()

  useEffect(() => {
    if (nivelesError) {
      setCarreraError(nivelesError)
    }
  }, [nivelesError])

  useEffect(() => {
    getCarreraNivelData()
  }, [])

  const handleOptionClick = option => {
    setCarreraCarreraPaginationData({ nivel: option?.id_nivel })
  }

  return (
    <div className="flex flex-col w-full max-w-[210px]">
      <label className="text-lg font-semibold">Nivel Carrera</label>
      <SelectInput
        options={nivelesData}
        handleOptionClick={handleOptionClick}
        onFirstChange={handleOptionClick}
        show="nombre"
        error={nivelesError}
        loading={nivelesLoading}
        firstOne
        notFocusable
      />
    </div>
  )
}
